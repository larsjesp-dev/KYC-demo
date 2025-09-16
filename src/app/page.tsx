'use client';

import { useState } from 'react';
import { KYCQuestionnaireComponent } from '../components/KYCQuestionnaireComponent';
import { sampleKYCQuestionnaire } from '../data/sample-questionnaire';
import { SegmentType, ProductType, QuestionResponse } from '../types/kyc-types';

export default function Home() {
  const [selectedSegment, setSelectedSegment] = useState<SegmentType | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);

  const handleComplete = (segmentResponses: QuestionResponse[]) => {
    setResponses(segmentResponses);
    console.log('KYC Questionnaire completed:', segmentResponses);
    // Here you would typically send the responses to your backend
  };

  const handleBackToSegmentSelection = () => {
    setSelectedSegment(null);
    setSelectedProduct(null);
    setResponses([]);
  };

  const handleBackToProductSelection = () => {
    setSelectedProduct(null);
    setResponses([]);
  };

  if (selectedSegment && selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button
              onClick={handleBackToProductSelection}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Product Selection
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {selectedSegment === 'consumer' ? 'Consumer' : 'Company'} KYC - {
                selectedProduct === 'general' ? 'General Questions' :
                selectedProduct === 'creditcard' ? 'Credit Card' :
                selectedProduct === 'deposits' ? 'Deposits' : 'Loan'
              }
            </h1>
          </div>
        </div>
        <KYCQuestionnaireComponent
          questionnaire={sampleKYCQuestionnaire}
          segmentType={selectedSegment}
          selectedProduct={selectedProduct}
          onComplete={handleComplete}
        />
      </div>
    );
  }

  if (selectedSegment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="max-w-4xl mx-auto text-center">
          <button
            onClick={handleBackToSegmentSelection}
            className="absolute top-8 left-8 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Segment Selection
          </button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose {selectedSegment === 'consumer' ? 'Consumer' : 'Company'} Product
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Select which product you'd like to complete the KYC questionnaire for.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📋</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">General</h2>
              <p className="text-gray-600 mb-6">
                Complete the general KYC questions including PEP status, tax residence, and income sources.
              </p>
              <ul className="text-left text-sm text-gray-500 mb-6">
                <li>• PEP (Politically Exposed Person)</li>
                <li>• Tax residence & FATCA</li>
                <li>• Income sources</li>
                <li>• Economic situation</li>
              </ul>
              <button
                onClick={() => setSelectedProduct('general')}
                className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Start General KYC
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💳</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Credit Card</h2>
              <p className="text-gray-600 mb-6">
                Complete KYC questionnaire for credit card application including usage patterns and financial information.
              </p>
              <ul className="text-left text-sm text-gray-500 mb-6">
                <li>• General questions</li>
                <li>• Credit card specific questions</li>
                <li>• Usage and spending patterns</li>
              </ul>
              <button
                onClick={() => setSelectedProduct('creditcard')}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Start Credit Card KYC
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏦</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Deposits</h2>
              <p className="text-gray-600 mb-6">
                Complete KYC questionnaire for deposit account including savings goals and funding sources.
              </p>
              <ul className="text-left text-sm text-gray-500 mb-6">
                <li>• General questions</li>
                <li>• Deposit account specific questions</li>
                <li>• Savings goals and purposes</li>
              </ul>
              <button
                onClick={() => setSelectedProduct('deposits')}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Start Deposits KYC
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">💰</div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Loan</h2>
              <p className="text-gray-600 mb-6">
                Complete KYC questionnaire for loan application including loan purpose and repayment capacity.
              </p>
              <ul className="text-left text-sm text-gray-500 mb-6">
                <li>• General questions</li>
                <li>• Loan specific questions</li>
                <li>• Purpose and amount details</li>
              </ul>
              <button
                onClick={() => setSelectedProduct('loan')}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Loan KYC
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">All products include:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div>✓ Identity verification</div>
              <div>✓ Tax residence questions</div>
              <div>✓ PEP screening</div>
              <div>✓ Source of funds</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          KYC Question Demo
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A comprehensive Know Your Customer questionnaire with structured data models for both Consumer and Company segments.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Consumer KYC</h2>
            <p className="text-gray-600 mb-6">
              Complete KYC questionnaire for individual consumers including questions about economy, citizenship, tax residence, and PEP status.
            </p>
            <ul className="text-left text-sm text-gray-500 mb-6">
              <li>• General questions</li>
              <li>• Credit card application</li>
              <li>• Deposit account setup</li>
              <li>• Loan application</li>
            </ul>
            <button
              onClick={() => setSelectedSegment('consumer')}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Consumer KYC
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company KYC</h2>
            <p className="text-gray-600 mb-6">
              Complete KYC questionnaire for companies including beneficial ownership information and business details.
            </p>
            <ul className="text-left text-sm text-gray-500 mb-6">
              <li>• Company information</li>
              <li>• Beneficial ownership</li>
              <li>• Business deposit accounts</li>
              <li>• Business loans</li>
            </ul>
            <button
              onClick={() => setSelectedSegment('company')}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Start Company KYC
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
            <div>✓ Follow-up questions</div>
            <div>✓ Conditional logic</div>
            <div>✓ Multiple question types</div>
            <div>✓ Progress tracking</div>
            <div>✓ Validation</div>
            <div>✓ Repeatable groups</div>
            <div>✓ Market selection</div>
            <div>✓ Multilingual support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
