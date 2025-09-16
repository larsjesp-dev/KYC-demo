'use client';

import React, { useState } from 'react';
import { KYCQuestionnaire, Question, QuestionResponse, SegmentType, ProductType } from '../types/kyc-types';

interface KYCQuestionnaireComponentProps {
  questionnaire: KYCQuestionnaire;
  segmentType: SegmentType;
  selectedProduct?: ProductType;
  onComplete?: (responses: QuestionResponse[]) => void;
}

export const KYCQuestionnaireComponent: React.FC<KYCQuestionnaireComponentProps> = ({ 
  questionnaire, 
  segmentType,
  selectedProduct,
  onComplete 
}) => {
  const [responses, setResponses] = useState<QuestionResponse[]>([]);

  // Filter the questionnaire to show only General and the selected product
  const filteredQuestionnaire: KYCQuestionnaire = {
    ...questionnaire,
    segments: questionnaire.segments.map(segment => {
      if (segment.type === segmentType) {
        return {
          ...segment,
          groups: segment.groups.filter(group => {
            // Build expected group IDs based on segment type
            const segmentPrefix = segmentType;
            const generalGroupId = `${segmentPrefix}-general`;
            const productGroupId = selectedProduct === 'general' ? null : `${segmentPrefix}-${selectedProduct}`;
            
            if (selectedProduct === 'general') {
              // If 'general' is selected, show only general questions
              return group.id === generalGroupId;
            } else if (selectedProduct) {
              // For specific products, show ONLY the product-specific questions
              return productGroupId && group.id === productGroupId;
            } else {
              // Fallback: show general + product if no specific product selected
              return group.id === generalGroupId || 
                     (productGroupId && group.id === productGroupId);
            }
          })
        };
      }
      return segment;
    })
  };

  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentSubgroupIndex, setCurrentSubgroupIndex] = useState(0);

  const segment = filteredQuestionnaire.segments.find(s => s.type === segmentType);
  if (!segment || segment.groups.length === 0) {
    return <div>No questions found for this segment.</div>;
  }

  const currentGroup = segment.groups[currentGroupIndex];
  const currentSubgroup = currentGroup.subgroups[currentSubgroupIndex];
  const totalGroups = segment.groups.length;
  const totalSubgroups = currentGroup.subgroups.length;

  // Progress calculation
  const overallProgress = ((currentGroupIndex * totalSubgroups + currentSubgroupIndex) / (totalGroups * totalSubgroups)) * 100;
  const groupProgress = (currentSubgroupIndex / totalSubgroups) * 100;

  const handleAnswerChange = (questionId: string, answer: string | string[] | number | boolean) => {
    setResponses(prev => {
      const existing = prev.find(r => r.questionId === questionId);
      if (existing) {
        return prev.map(r => 
          r.questionId === questionId 
            ? { ...r, value: answer, timestamp: new Date().toISOString() }
            : r
        );
      } else {
        return [...prev, {
          questionId,
          value: answer,
          timestamp: new Date().toISOString()
        }];
      }
    });
  };

  const navigateToNext = () => {
    if (currentSubgroupIndex < totalSubgroups - 1) {
      setCurrentSubgroupIndex(prev => prev + 1);
    } else if (currentGroupIndex < totalGroups - 1) {
      setCurrentGroupIndex(prev => prev + 1);
      setCurrentSubgroupIndex(0);
    } else if (onComplete) {
      onComplete(responses);
    }
  };

  const navigateToPrevious = () => {
    if (currentSubgroupIndex > 0) {
      setCurrentSubgroupIndex(prev => prev - 1);
    } else if (currentGroupIndex > 0) {
      setCurrentGroupIndex(prev => prev - 1);
      setCurrentSubgroupIndex(segment.groups[currentGroupIndex - 1].subgroups.length - 1);
    }
  };

  const isLastStep = currentGroupIndex === totalGroups - 1 && currentSubgroupIndex === totalSubgroups - 1;
  const isFirstStep = currentGroupIndex === 0 && currentSubgroupIndex === 0;

  const renderQuestion = (question: Question, parentPrefix: string = '') => {
    const questionId = `${parentPrefix}${question.id}`;
    const response = responses.find(r => r.questionId === questionId);
    
    return (
      <div key={questionId} className="mb-6 p-4 border border-gray-200 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {question.text}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {renderQuestionInput(question, questionId, response?.value)}
        
        {/* Render follow-up questions */}
        {renderFollowUpQuestions(question, questionId, response?.value)}
      </div>
    );
  };

  const renderQuestionInput = (question: Question, questionId: string, currentAnswer?: string | string[] | number | boolean) => {
    switch (question.type) {
      case 'radio':
        return (
          <div className="space-y-2">
            {question.options?.map((option) => (
              <label key={option.id} className="flex items-center">
                <input
                  type="radio"
                  name={questionId}
                  value={option.value}
                  checked={currentAnswer === option.value}
                  onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-black">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'dropdown-single':
        return (
          <select
            value={currentAnswer as string || ''}
            onChange={(e) => handleAnswerChange(questionId, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Välj...</option>
            {question.options?.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'dropdown-multiple':
        const multipleValues = (currentAnswer as string[]) || [];
        return (
          <div className="space-y-2 border border-gray-300 rounded-md p-4">
            {question.options?.map((option) => (
              <label key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={multipleValues.includes(option.value)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...multipleValues, option.value]
                      : multipleValues.filter(v => v !== option.value);
                    handleAnswerChange(questionId, newValues);
                  }}
                  className="mr-2"
                />
                <span className="text-sm text-black">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            value={currentAnswer as string || ''}
            onChange={(e) => handleAnswerChange(questionId, e.target.value)}
            min={question.numberConfig?.min}
            max={question.numberConfig?.max}
            step={question.numberConfig?.step}
            placeholder={question.numberConfig?.placeholder}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        );

      case 'freetext':
        return question.textConfig?.multiline ? (
          <textarea
            value={currentAnswer as string || ''}
            onChange={(e) => handleAnswerChange(questionId, e.target.value)}
            maxLength={question.textConfig?.maxLength}
            placeholder={question.textConfig?.placeholder}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        ) : (
          <input
            type="text"
            value={currentAnswer as string || ''}
            onChange={(e) => handleAnswerChange(questionId, e.target.value)}
            maxLength={question.textConfig?.maxLength}
            placeholder={question.textConfig?.placeholder}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        );

      case 'date':
        return (
          <input
            type="date"
            value={currentAnswer as string || ''}
            onChange={(e) => handleAnswerChange(questionId, e.target.value)}
            min={question.dateConfig?.minDate}
            max={question.dateConfig?.maxDate}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        );

      case 'market-selector':
        return (
          <select
            value={currentAnswer as string || ''}
            onChange={(e) => handleAnswerChange(questionId, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          >
            <option value="">Välj marknad...</option>
            {question.marketConfig?.markets?.map((market) => (
              <option key={market} value={market}>
                {market}
              </option>
            ))}
          </select>
        );

      default:
        return <div>Okänd frågetyp: {question.type}</div>;
    }
  };

  const renderFollowUpQuestions = (question: Question, parentQuestionId: string, parentAnswer?: string | string[] | number | boolean) => {
    if (!question.options || question.options.length === 0) {
      return null;
    }

    let relevantFollowUps: Question[] = [];

    if (question.type === 'dropdown-multiple' && Array.isArray(parentAnswer)) {
      // For multiple selection, show follow-ups for all selected answers
      const selectedValues = parentAnswer as string[];
      const allOptions = question.options || [];
      
      selectedValues.forEach(selectedValue => {
        const matchingOption = allOptions.find(opt => opt.value === selectedValue);
        if (matchingOption && matchingOption.followUpQuestions) {
          relevantFollowUps = relevantFollowUps.concat(matchingOption.followUpQuestions);
        }
      });
    } else if (typeof parentAnswer === 'string' && parentAnswer) {
      // For single selection (radio, dropdown-single)
      const selectedOption = question.options?.find(opt => opt.value === parentAnswer);
      if (selectedOption && selectedOption.followUpQuestions) {
        relevantFollowUps = selectedOption.followUpQuestions;
      }
    }

    if (relevantFollowUps.length === 0) {
      return null;
    }

    return (
      <div className="ml-6 mt-4 pl-4 border-l-2 border-blue-200">
        <div className="mb-2 text-sm font-medium text-gray-600">Följdfrågor:</div>
        {relevantFollowUps.map((followUp) => 
          renderQuestion(followUp, `${parentQuestionId}-followup-`)
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {questionnaire.title}
        </h1>
        <p className="text-gray-600">{questionnaire.description}</p>
        {selectedProduct && (
          <div className="mt-2 text-sm text-blue-600 font-medium">
            Produkt: {selectedProduct === 'general' ? 'Allmänna frågor' :
                     selectedProduct === 'creditcard' ? 'Kreditkort' : 
                     selectedProduct === 'deposits' ? 'Sparkonto' : 'Lån'}
          </div>
        )}
      </div>

      {/* Progress indicators */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Övergripande framsteg</span>
          <span>{Math.round(overallProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{currentGroup.title} - {currentSubgroup.title}</span>
          <span>{Math.round(groupProgress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div 
            className="bg-green-500 h-1 rounded-full transition-all duration-300" 
            style={{ width: `${groupProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Current subgroup questions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {currentSubgroup.title}
        </h2>
        {currentSubgroup.description && (
          <p className="text-gray-600 mb-6">{currentSubgroup.description}</p>
        )}

        <div className="space-y-6">
          {currentSubgroup.questions.map((question) => 
            renderQuestion(question)
          )}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          onClick={navigateToPrevious}
          disabled={isFirstStep}
          className={`px-6 py-2 rounded-md ${
            isFirstStep 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-500 text-white hover:bg-gray-600'
          }`}
        >
          Föregående
        </button>

        <div className="text-sm text-gray-600">
          Steg {currentSubgroupIndex + 1} av {totalSubgroups} - Kategori {currentGroupIndex + 1} av {totalGroups}
        </div>

        <button
          onClick={navigateToNext}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isLastStep ? 'Slutför' : 'Nästa'}
        </button>
      </div>

      {/* Debug information (can be removed in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Debug Info:</h3>
          <p className="text-sm text-gray-600">
            Responses: {responses.length} | 
            Current Group: {currentGroupIndex + 1}/{totalGroups} | 
            Current Subgroup: {currentSubgroupIndex + 1}/{totalSubgroups} |
            Selected Product: {selectedProduct || 'none'}
          </p>
        </div>
      )}
    </div>
  );
};
