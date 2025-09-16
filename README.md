# KYC Question Demo

A comprehensive Know Your Customer (KYC) questionnaire application built with Next.js, TypeScript, and Tailwind CSS. This demo showcases a structured data model for handling complex questionnaire workflows with conditional logic, follow-up questions, and repeatable sections.

## 🚀 Features

- **Multi-Segment Support**: Consumer and Company KYC questionnaires
- **Dynamic Question Types**: Radio buttons, dropdowns, number inputs, text fields, date pickers, and market selectors
- **Conditional Logic**: Follow-up questions based on previous answers
- **Unlimited Nesting**: Multiple levels of follow-up questions supported
- **Repeatable Groups**: Dynamic question groups for complex scenarios (e.g., beneficial ownership)
- **Progress Tracking**: Visual progress indicators and completion percentage
- **Validation**: Built-in validation for all question types
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **TypeScript**: Fully typed for better development experience

## 📋 Project Structure

The KYC questionnaire is organized in a four-layer hierarchy:

### Layer 1: Segments and Groupings
- **Consumer Segment**:
  - General (Economy, Citizenship, Tax Residence, PEP status)
  - Credit Card
  - Deposits  
  - Loan

- **Company Segment**:
  - General (Company info, Beneficial ownership)
  - Deposits
  - Loan

### Layer 2: Question Types
- `radio` - Radio button selection
- `dropdown-single` - Single selection dropdown
- `dropdown-multiple` - Multiple selection dropdown  
- `number` - Number input with min/max constraints
- `freetext` - Text input (single/multiline)
- `date` - Date picker with range validation
- `market-selector` - Country/market selection

### Layer 3: Follow-up Questions
- Conditional questions triggered by specific answer choices
- Support for multiple layers of nested follow-ups
- Multiple questions can be triggered simultaneously

### Layer 4: Repeatable Groups
- Dynamic question groups that can be added/removed by users
- Perfect for scenarios like multiple beneficial owners
- Configurable min/max instances

## 🏗️ Architecture

### Data Model (`src/types/kyc-types.ts`)
The core data structure includes:
- `KYCQuestionnaire` - Top-level questionnaire container
- `KYCSegment` - Consumer/Company segments
- `QuestionGroup` - Main question categories
- `QuestionSubgroup` - Subcategories within groups
- `Question` - Individual questions with type-specific configurations
- `RepeatableQuestionGroup` - Dynamic question collections

### Components (`src/components/`)
- `KYCQuestionnaireComponent` - Main questionnaire renderer
- Dynamic question rendering based on question type
- Navigation and progress tracking
- Response validation and error handling

### Utilities (`src/utils/kyc-utils.ts`)
- `KYCQuestionnaireUtils` - Helper functions for:
  - Question visibility logic
  - Follow-up question resolution
  - Response validation
  - Progress calculation
  - Data transformation

### Sample Data (`src/data/sample-questionnaire.ts`)
Complete example questionnaire with:
- Swedish language questions (mixed with English for demo)
- Real-world KYC scenarios
- Complex conditional logic examples
- Repeatable group demonstrations

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Development
Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build
Create a production build:
```bash
npm run build
npm start
```

## 🎯 Usage

1. **Select Segment**: Choose between Consumer or Company KYC
2. **Answer Questions**: Progress through questions with automatic validation
3. **Follow-up Logic**: Additional questions appear based on your answers
4. **Progress Tracking**: Monitor completion percentage
5. **Submit**: Complete questionnaire and view collected responses

## 📊 Data Structure Example

```typescript
{
  "id": "kyc-questionnaire-v1",
  "segments": [
    {
      "type": "consumer",
      "groups": [
        {
          "title": "General",
          "subgroups": [
            {
              "title": "Economy Questions",
              "questions": [
                {
                  "type": "radio",
                  "text": "Employment Status?",
                  "options": [
                    {
                      "value": "employed",
                      "followUpQuestions": [...]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## 🔧 Customization

### Adding New Question Types
1. Extend the `QuestionType` union in `kyc-types.ts`
2. Add rendering logic in `KYCQuestionnaireComponent.tsx`
3. Update validation in `kyc-utils.ts`

### Adding New Segments
1. Create new segment data in `sample-questionnaire.ts`
2. Update the UI in `page.tsx` to include new segment option

## 🧪 Example Scenarios

The demo includes realistic KYC scenarios:

**Consumer Examples**:
- Employment status with employer details follow-up
- Dual citizenship with additional country selection
- PEP (Politically Exposed Person) status verification

**Company Examples**:
- Beneficial ownership with repeatable owner information
- Business purpose classification
- Corporate structure details

## 🔍 Technical Highlights

- **Type Safety**: Full TypeScript implementation with strict typing
- **Performance**: Efficient re-rendering with React state management
- **Accessibility**: Semantic HTML and proper form labels
- **Validation**: Client-side validation with user-friendly error messages
- **Responsive**: Mobile-first design approach

## 📈 Future Enhancements

- Backend API integration
- Multi-language support system
- Question branching visualization
- Export functionality (PDF, JSON)
- Admin panel for questionnaire management
- Advanced validation rules engine
- Progress saving and resume functionality

---

This project demonstrates a comprehensive approach to building complex, conditional questionnaires for financial services compliance.
