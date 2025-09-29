// KYC Data Model Types

export type SegmentType = 'consumer' | 'company';

export type ProductType = 'general' | 'creditcard' | 'deposits' | 'loan';

export type QuestionType = 
  | 'radio' 
  | 'dropdown-single' 
  | 'dropdown-multiple' 
  | 'number' 
  | 'freetext' 
  | 'date' 
  | 'market-selector';

export interface AnswerOption {
  id: string;
  label: string;
  value: string;
  // Conditional follow-up questions triggered by this answer
  followUpQuestions?: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  required: boolean;
  order: number;
  
  // For radio, dropdown questions
  options?: AnswerOption[];
  
  // For number inputs
  numberConfig?: {
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
  };
  
  // For text inputs
  textConfig?: {
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    multiline?: boolean;
  };
  
  // For date inputs
  dateConfig?: {
    minDate?: string;
    maxDate?: string;
    format?: string;
  };
  
  // For market selector
  marketConfig?: {
    allowMultiple?: boolean;
    markets?: string[];
    placeholder?: string;
  };
  
  // Validation rules
  validation?: {
    pattern?: string;
    message?: string;
  };
  
  // Help text or additional information
  helpText?: string;
  
  // Conditional logic - when to show this question
  showCondition?: {
    dependsOn: string; // Question ID this depends on
    values: string[]; // Values that trigger showing this question
  };
}

export interface RepeatableQuestionGroup {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  minInstances: number;
  maxInstances?: number;
  addButtonText: string;
  removeButtonText: string;
}

export interface QuestionSubgroup {
  id: string;
  title: string;
  description?: string;
  order: number;
  questions: Question[];
  repeatableGroups?: RepeatableQuestionGroup[];
}

export interface QuestionGroup {
  id: string;
  title: string;
  description?: string;
  order: number;
  subgroups: QuestionSubgroup[];
}

export interface KYCSegment {
  id: string;
  type: SegmentType;
  title: string;
  description?: string;
  groups: QuestionGroup[];
}

export interface KYCQuestionnaire {
  id: string;
  version: string;
  title: string;
  description?: string;
  segments: KYCSegment[];
  createdAt: string;
  updatedAt: string;
}

// Response types for storing answers
export interface QuestionResponse {
  questionId: string;
  value: string | string[] | number | boolean;
  timestamp: string;
}

export interface RepeatableGroupResponse {
  groupId: string;
  instanceId: string;
  responses: QuestionResponse[];
}

export interface SubgroupResponse {
  subgroupId: string;
  responses: QuestionResponse[];
  repeatableGroupResponses?: RepeatableGroupResponse[];
}

export interface GroupResponse {
  groupId: string;
  subgroupResponses: SubgroupResponse[];
}

export interface SegmentResponse {
  segmentId: string;
  groupResponses: GroupResponse[];
}

export interface KYCResponse {
  questionnaireId: string;
  userId: string;
  segmentResponses: SegmentResponse[];
  startedAt: string;
  completedAt?: string;
  status: 'draft' | 'completed' | 'submitted';
}
