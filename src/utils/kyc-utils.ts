import { KYCQuestionnaire, Question, AnswerOption, QuestionResponse, SegmentResponse } from '../types/kyc-types';

/**
 * Utility functions for working with KYC questionnaires
 */

export class KYCQuestionnaireUtils {
  /**
   * Get all questions from a questionnaire (flattened)
   */
  static getAllQuestions(questionnaire: KYCQuestionnaire): Question[] {
    const questions: Question[] = [];
    
    questionnaire.segments.forEach(segment => {
      segment.groups.forEach(group => {
        group.subgroups.forEach(subgroup => {
          // Add regular questions
          questions.push(...subgroup.questions);
          
          // Add questions from repeatable groups
          subgroup.repeatableGroups?.forEach(repeatableGroup => {
            questions.push(...repeatableGroup.questions);
          });
          
          // Add follow-up questions recursively
          subgroup.questions.forEach(question => {
            questions.push(...this.getFollowUpQuestions(question));
          });
        });
      });
    });
    
    return questions;
  }

  /**
   * Get all follow-up questions recursively
   */
  static getFollowUpQuestions(question: Question): Question[] {
    const followUpQuestions: Question[] = [];
    
    question.options?.forEach(option => {
      if (option.followUpQuestions) {
        followUpQuestions.push(...option.followUpQuestions);
        
        // Recursively get follow-up questions of follow-up questions
        option.followUpQuestions.forEach(followUp => {
          followUpQuestions.push(...this.getFollowUpQuestions(followUp));
        });
      }
    });
    
    return followUpQuestions;
  }

  /**
   * Find a question by ID
   */
  static findQuestionById(questionnaire: KYCQuestionnaire, questionId: string): Question | null {
    const allQuestions = this.getAllQuestions(questionnaire);
    return allQuestions.find(q => q.id === questionId) || null;
  }

  /**
   * Get questions that should be shown based on current responses
   */
  static getVisibleQuestions(
    questionnaire: KYCQuestionnaire, 
    segmentId: string, 
    responses: QuestionResponse[]
  ): Question[] {
    const segment = questionnaire.segments.find(s => s.id === segmentId);
    if (!segment) return [];

    const visibleQuestions: Question[] = [];
    const responseMap = new Map(responses.map(r => [r.questionId, r.value]));

    segment.groups.forEach(group => {
      group.subgroups.forEach(subgroup => {
        subgroup.questions.forEach(question => {
          if (this.shouldShowQuestion(question, responseMap)) {
            visibleQuestions.push(question);
            
            // Check for follow-up questions
            const followUps = this.getTriggeredFollowUpQuestions(question, responseMap);
            visibleQuestions.push(...followUps);
          }
        });
      });
    });

    return visibleQuestions;
  }

  /**
   * Check if a question should be shown based on its conditions
   */
  static shouldShowQuestion(question: Question, responses: Map<string, any>): boolean {
    if (!question.showCondition) return true;
    
    const dependencyValue = responses.get(question.showCondition.dependsOn);
    if (!dependencyValue) return false;
    
    return question.showCondition.values.includes(String(dependencyValue));
  }

  /**
   * Get follow-up questions that should be shown based on current answer
   */
  static getTriggeredFollowUpQuestions(
    question: Question, 
    responses: Map<string, any>
  ): Question[] {
    const currentAnswer = responses.get(question.id);
    if (!currentAnswer || !question.options) return [];

    const triggeredQuestions: Question[] = [];
    
    question.options.forEach(option => {
      if (option.value === currentAnswer && option.followUpQuestions) {
        option.followUpQuestions.forEach(followUp => {
          if (this.shouldShowQuestion(followUp, responses)) {
            triggeredQuestions.push(followUp);
            
            // Recursively get nested follow-ups
            const nestedFollowUps = this.getTriggeredFollowUpQuestions(followUp, responses);
            triggeredQuestions.push(...nestedFollowUps);
          }
        });
      }
    });

    return triggeredQuestions;
  }

  /**
   * Validate a response against question constraints
   */
  static validateResponse(question: Question, value: any): { isValid: boolean; message?: string } {
    if (question.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return { isValid: false, message: 'This field is required' };
    }

    if (!value && !question.required) {
      return { isValid: true };
    }

    switch (question.type) {
      case 'number':
        const numValue = Number(value);
        if (isNaN(numValue)) {
          return { isValid: false, message: 'Must be a valid number' };
        }
        if (question.numberConfig?.min !== undefined && numValue < question.numberConfig.min) {
          return { isValid: false, message: `Must be at least ${question.numberConfig.min}` };
        }
        if (question.numberConfig?.max !== undefined && numValue > question.numberConfig.max) {
          return { isValid: false, message: `Must not exceed ${question.numberConfig.max}` };
        }
        break;

      case 'freetext':
        const textValue = String(value);
        if (question.textConfig?.minLength && textValue.length < question.textConfig.minLength) {
          return { isValid: false, message: `Must be at least ${question.textConfig.minLength} characters` };
        }
        if (question.textConfig?.maxLength && textValue.length > question.textConfig.maxLength) {
          return { isValid: false, message: `Must not exceed ${question.textConfig.maxLength} characters` };
        }
        if (question.validation?.pattern) {
          const regex = new RegExp(question.validation.pattern);
          if (!regex.test(textValue)) {
            return { isValid: false, message: question.validation.message || 'Invalid format' };
          }
        }
        break;

      case 'date':
        const dateValue = new Date(value);
        if (isNaN(dateValue.getTime())) {
          return { isValid: false, message: 'Must be a valid date' };
        }
        if (question.dateConfig?.minDate) {
          const minDate = new Date(question.dateConfig.minDate);
          if (dateValue < minDate) {
            return { isValid: false, message: `Date must be after ${minDate.toDateString()}` };
          }
        }
        if (question.dateConfig?.maxDate) {
          const maxDate = new Date(question.dateConfig.maxDate);
          if (dateValue > maxDate) {
            return { isValid: false, message: `Date must be before ${maxDate.toDateString()}` };
          }
        }
        break;

      case 'radio':
      case 'dropdown-single':
        if (!question.options?.some(opt => opt.value === value)) {
          return { isValid: false, message: 'Invalid selection' };
        }
        break;

      case 'dropdown-multiple':
        if (!Array.isArray(value)) {
          return { isValid: false, message: 'Must select at least one option' };
        }
        const validValues = question.options?.map(opt => opt.value) || [];
        if (!value.every(v => validValues.includes(v))) {
          return { isValid: false, message: 'Contains invalid selections' };
        }
        break;
    }

    return { isValid: true };
  }

  /**
   * Calculate completion percentage for a segment
   */
  static calculateCompletionPercentage(
    questionnaire: KYCQuestionnaire,
    segmentId: string,
    responses: QuestionResponse[]
  ): number {
    const visibleQuestions = this.getVisibleQuestions(questionnaire, segmentId, responses);
    const requiredQuestions = visibleQuestions.filter(q => q.required);
    
    if (requiredQuestions.length === 0) return 100;
    
    const responseMap = new Map(responses.map(r => [r.questionId, r.value]));
    const completedRequired = requiredQuestions.filter(q => {
      const response = responseMap.get(q.id);
      return response !== undefined && response !== null && response !== '';
    });

    return Math.round((completedRequired.length / requiredQuestions.length) * 100);
  }

  /**
   * Generate a summary of responses for a segment
   */
  static generateResponseSummary(
    questionnaire: KYCQuestionnaire,
    segmentResponse: SegmentResponse
  ): { [questionId: string]: { question: string; answer: string } } {
    const summary: { [questionId: string]: { question: string; answer: string } } = {};
    
    segmentResponse.groupResponses.forEach(groupResponse => {
      groupResponse.subgroupResponses.forEach(subgroupResponse => {
        subgroupResponse.responses.forEach(response => {
          const question = this.findQuestionById(questionnaire, response.questionId);
          if (question) {
            let answerText = String(response.value);
            
            // Convert option values to labels for better readability
            if (question.type === 'radio' || question.type === 'dropdown-single') {
              const option = question.options?.find(opt => opt.value === response.value);
              answerText = option?.label || answerText;
            } else if (question.type === 'dropdown-multiple' && Array.isArray(response.value)) {
              const labels = response.value.map(val => {
                const option = question.options?.find(opt => opt.value === val);
                return option?.label || val;
              });
              answerText = labels.join(', ');
            }
            
            summary[response.questionId] = {
              question: question.text,
              answer: answerText
            };
          }
        });
      });
    });

    return summary;
  }
}
