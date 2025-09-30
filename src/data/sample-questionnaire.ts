import { KYCQuestionnaire } from '../types/kyc-types';

export const sampleKYCQuestionnaire: KYCQuestionnaire = {
  id: 'kyc-questionnaire-v1',
  version: '1.0.0',
  title: 'KYC Questionnaire',
  description: 'Know Your Customer questionnaire for both consumers and companies',
  segments: [
    {
      id: 'consumer-segment',
      type: 'consumer',
      title: 'Consumer KYC',
      description: 'Questions for individual consumers',
      groups: [
        {
          id: 'consumer-general',
          title: 'General',
          description: 'General questions for consumers',
          order: 1,
          subgroups: [
            {
              id: 'consumer-general-personal-info',
              title: 'Personuppgifter & Adress',
              description: 'Personal information and address details',
              order: 1,
              questions: [
                {
                  id: 'personal-number',
                  text: 'Personnummer',
                  type: 'freetext',
                  required: true,
                  order: 1,
                  textConfig: {
                    placeholder: 'ÅÅMMDD-XXXX',
                    maxLength: 13
                  }
                },
                {
                  id: 'full-name',
                  text: 'Fullständigt namn - för, mellan, efternamn',
                  type: 'freetext',
                  required: true,
                  order: 2,
                  textConfig: {
                    placeholder: 'Ange ditt fullständiga namn',
                    maxLength: 100
                  }
                },
                {
                  id: 'mobile-phone',
                  text: 'Mobil privat/jobb',
                  type: 'freetext',
                  required: true,
                  order: 3,
                  textConfig: {
                    placeholder: 'Ange mobilnummer',
                    maxLength: 20
                  }
                },
                {
                  id: 'email',
                  text: 'E-post privat/jobb',
                  type: 'freetext',
                  required: true,
                  order: 4,
                  textConfig: {
                    placeholder: 'Ange e-postadress',
                    maxLength: 100
                  }
                },
                {
                  id: 'registered-address-line1',
                  text: 'Adress linje 1',
                  type: 'freetext',
                  required: true,
                  order: 5,
                  textConfig: {
                    placeholder: 'T.ex. Storgatan 123',
                    maxLength: 100
                  }
                },
                {
                  id: 'registered-address-line2',
                  text: 'Adress linje 2',
                  type: 'freetext',
                  required: false,
                  order: 6,
                  textConfig: {
                    placeholder: 'Lägenhetsnummer, c/o, etc. (valfritt)',
                    maxLength: 100
                  }
                },
                {
                  id: 'registered-postal-code',
                  text: 'Postnummer',
                  type: 'freetext',
                  required: true,
                  order: 7,
                  textConfig: {
                    placeholder: 'T.ex. 123 45',
                    maxLength: 10
                  }
                },
                {
                  id: 'registered-city',
                  text: 'Ort',
                  type: 'freetext',
                  required: true,
                  order: 8,
                  textConfig: {
                    placeholder: 'T.ex. Stockholm',
                    maxLength: 50
                  }
                },
                {
                  id: 'registered-country',
                  text: 'Land',
                  type: 'market-selector',
                  required: true,
                  order: 9,
                  marketConfig: {
                    allowMultiple: false,
                    markets: ['Sverige', 'Norge', 'Danmark', 'Finland', 'Island', 'Tyskland', 'Frankrike', 'Storbritannien', 'Nederländerna', 'Belgien', 'Spanien', 'Italien', 'Polen', 'Österrike', 'Schweiz', 'USA', 'Kanada', 'Australien', 'Other']
                  }
                },
                {
                  id: 'other-address',
                  text: 'Annan adress - Särskild adress/tillfällig',
                  type: 'freetext',
                  required: false,
                  order: 10,
                  textConfig: {
                    placeholder: 'Ange annan adress (valfritt)',
                    maxLength: 200
                  }
                }
              ]
            },
            {
              id: 'consumer-general-economy',
              title: 'Frågor om din ekonomi',
              description: 'Questions about your economy',
              order: 2,
              questions: [
                {
                  id: 'monthly-income',
                  text: 'Vad är din månadsinkomst?',
                  type: 'number',
                  required: true,
                  order: 1,
                  numberConfig: {
                    min: 0,
                    placeholder: 'Ange belopp i SEK'
                  }
                },
                {
                  id: 'income-sources',
                  text: 'Vart kommer din inkomst ifrån? (Flera svarsalternativ är möjliga)',
                  type: 'dropdown-multiple',
                  required: true,
                  order: 2,
                  options: [
                    { id: 'employment-salary', label: 'Lön från anställning', value: 'employment-salary' },
                    { id: 'own-business', label: 'Egen företag/verksamhet (lön/utdelning)', value: 'own-business' },
                    { id: 'pension', label: 'Pension', value: 'pension' },
                    { id: 'student-aid', label: 'Studiemedel (CSN)', value: 'student-aid' },
                    { id: 'unemployment-benefit', label: 'A-kassa / arbetslöshetsersättning', value: 'unemployment-benefit' },
                    { id: 'social-insurance', label: 'Ersättning från Försäkringskassan (t.ex. sjukpenning, föräldrapenning)', value: 'social-insurance' },
                    { id: 'capital-income', label: 'Kapitalinkomster (ränta/utdelning/värdepapper)', value: 'capital-income' },
                    { id: 'rental-income', label: 'Hyres-/uthyrningsinkomster', value: 'rental-income' },
                    { id: 'one-time-sale', label: 'Engångsbelopp – försäljning (bostad/företag/egendom)', value: 'one-time-sale' },
                    { id: 'inheritance-gift', label: 'Arv eller gåva', value: 'inheritance-gift' },
                    { id: 'insurance-payout', label: 'Försäkringsutbetalning', value: 'insurance-payout' },
                    { id: 'gambling-winnings', label: 'Spelvinster', value: 'gambling-winnings' },
                    { id: 'crypto-assets', label: 'Krypto/virtuella tillgångar', value: 'crypto-assets' },
                    {
                      id: 'other-income',
                      label: 'Annat',
                      value: 'other-income',
                      followUpQuestions: [
                        {
                          id: 'other-income-source',
                          text: 'Ange vart din inkomst kommer ifrån',
                          type: 'freetext',
                          required: true,
                          order: 1,
                          textConfig: {
                            placeholder: 'Beskriv din inkomstkälla'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 'consumer-general-citizenship',
              title: 'Frågor om medborgarskap och skatterättslig hemvist',
              description: 'Questions about citizenship and tax residence',
              order: 3,
              questions: [
                {
                  id: 'citizenship',
                  text: 'Ange ditt medborgarskap',
                  type: 'market-selector',
                  required: true,
                  order: 1,
                  marketConfig: {
                    allowMultiple: false,
                    markets: ['Sweden', 'Norway', 'Denmark', 'Finland', 'Germany', 'United Kingdom', 'United States', 'Other'],
                    placeholder: 'Välj medborgarskap...'
                  }
                },
                {
                  id: 'multiple-citizenship',
                  text: 'Har du flera medborgarskap?',
                  type: 'radio',
                  required: true,
                  order: 2,
                  options: [
                    {
                      id: 'yes-multiple',
                      label: 'Ja',
                      value: 'yes',
                      followUpQuestions: [
                        {
                          id: 'additional-citizenships',
                          text: 'Vilka länder',
                          type: 'market-selector',
                          required: true,
                          order: 1,
                          marketConfig: {
                            allowMultiple: true,
                            markets: ['Sweden', 'Norway', 'Denmark', 'Finland', 'Germany', 'United Kingdom', 'United States', 'France', 'Spain', 'Italy', 'Poland', 'Other']
                          }
                        }
                      ]
                    },
                    {
                      id: 'no-multiple',
                      label: 'Nej',
                      value: 'no'
                    }
                  ]
                },
                {
                  id: 'other-tax-residence',
                  text: 'Har du skattehemvist i något annat land än Sverige?',
                  type: 'radio',
                  required: true,
                  order: 3,
                  options: [
                    { 
                      id: 'yes-tax-residence', 
                      label: 'Ja', 
                      value: 'yes',
                      followUpQuestions: [
                        {
                          id: 'tax-residence-countries',
                          text: 'Ange land(er) där du har skattehemvist:',
                          type: 'market-selector',
                          required: true,
                          order: 1,
                          marketConfig: {
                            allowMultiple: true,
                            markets: ['Norge', 'Danmark', 'Finland', 'Island', 'Tyskland', 'Frankrike', 'Storbritannien', 'Nederländerna', 'Belgien', 'Spanien', 'Italien', 'Polen', 'Österrike', 'Schweiz', 'USA', 'Kanada', 'Australien', 'Kina', 'Japan', 'Singapore', 'Hong Kong', 'Indien', 'Brasilien', 'Other'],
                            placeholder: 'Välj länder...'
                          }
                        }
                      ]
                    },
                    { id: 'no-tax-residence', label: 'Nej', value: 'no' }
                  ]
                }
              ]
            },
            {
              id: 'consumer-general-pep',
              title: 'Frågor om PEP/nära familjemedlem eller känd medarbetare till en PEP',
              description: 'Questions about Politically Exposed Persons',
              order: 4,
              questions: [
                {
                  id: 'pep-status',
                  text: 'Är du en person i politiskt utsatt ställning (PEP) eller är du familjemedlem eller känd medarbetare till en sådan person? * (Läs mer om PEP)',
                  type: 'radio',
                  required: true,
                  order: 1,
                  helpText: 'En PEP (Politically Exposed Person) är en person som innehar eller har innehaft ett framstående offentligt ämbete, samt familjemedlemmar och kända medarbetare till sådana personer.',
                  options: [
                    {
                      id: 'yes-pep-status',
                      label: 'Ja',
                      value: 'yes',
                      followUpQuestions: [
                        {
                          id: 'pep-type',
                          text: 'Vem är PEP?',
                          type: 'radio',
                          required: true,
                          order: 1,
                          options: [
                            {
                              id: 'self-pep',
                              label: 'Jag är själv en person i politiskt utsatt ställning (PEP)',
                              value: 'self-pep',
                              followUpQuestions: [
                                {
                                  id: 'self-pep-title',
                                  text: 'Ange din titel',
                                  type: 'radio',
                                  required: true,
                                  order: 1,
                                  options: [
                                    { id: 'head-of-state-government', label: 'Stats- eller regeringschef', value: 'head-of-state-government' },
                                    { id: 'minister', label: 'Minister eller vice/biträdande minister', value: 'minister' },
                                    { id: 'parliament-member', label: 'Parlamentsledamot', value: 'parliament-member' },
                                    { id: 'supreme-court-judge', label: 'Domare i högsta domstolen', value: 'supreme-court-judge' },
                                    { id: 'constitutional-court', label: 'Konstitutionell domstol eller liknande befattning', value: 'constitutional-court' },
                                    { id: 'audit-central-bank', label: 'Högre tjänsteman vid revisionsmyndighet eller ledamot i centralbanks styrande organ', value: 'audit-central-bank' },
                                    { id: 'ambassador', label: 'Ambassadör', value: 'ambassador' },
                                    { id: 'military-diplomat', label: 'Beskickningschef eller hög officer i försvarsmakten', value: 'military-diplomat' },
                                    { id: 'state-enterprise', label: 'Person som ingår i statsägt företags förvaltning, lednings- eller kontrollorgan', value: 'state-enterprise' },
                                    { id: 'international-org', label: 'Ledande befattning i mellanstatlig organisation eller medlem i dess högsta ledning', value: 'international-org' },
                                    { id: 'political-party', label: 'Ledamot i styrelsen för ett politiskt parti', value: 'political-party' },
                                    { 
                                      id: 'other-title', 
                                      label: 'Annat (Vänligen ange)', 
                                      value: 'other-title',
                                      followUpQuestions: [
                                        {
                                          id: 'other-title-specify',
                                          text: 'Ange din titel:',
                                          type: 'freetext',
                                          required: true,
                                          order: 1,
                                          textConfig: {
                                            placeholder: 'Ange din specifika titel...',
                                            maxLength: 150
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  id: 'self-pep-country',
                                  text: 'Ange land eller organisation för PEP',
                                  type: 'freetext',
                                  required: true,
                                  order: 2,
                                  textConfig: {
                                    placeholder: 'Exempel: Sverige, EU, FN'
                                  }
                                },
                                {
                                  id: 'self-pep-resigned',
                                  text: 'Är du fortfarande aktiv i din roll?',
                                  type: 'radio',
                                  required: true,
                                  order: 3,
                                  options: [
                                    { id: 'self-resigned-yes', label: 'Ja', value: 'yes' },
                                    { 
                                      id: 'self-resigned-no', 
                                      label: 'Nej', 
                                      value: 'no',
                                      followUpQuestions: [
                                        {
                                          id: 'self-pep-resignation-date',
                                          text: 'Ange datum då du trädde ur PEP-ställningen:',
                                          type: 'date',
                                          required: true,
                                          order: 1
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              id: 'family-pep',
                              label: 'Jag är familjemedlem till en PEP',
                              value: 'family-pep',
                              followUpQuestions: [
                                {
                                  id: 'family-pep-name-title',
                                  text: 'Ange namn och titel för PEP',
                                  type: 'freetext',
                                  required: true,
                                  order: 1,
                                  textConfig: {
                                    placeholder: 'Exempel: John Doe, Minister för utrikesärenden'
                                  }
                                },
                                {
                                  id: 'family-pep-country',
                                  text: 'Ange land eller organisation för PEP',
                                  type: 'freetext',
                                  required: true,
                                  order: 2,
                                  textConfig: {
                                    placeholder: 'Exempel: Sverige, EU, FN'
                                  }
                                },
                                {
                                  id: 'family-pep-resigned',
                                  text: 'Är familjemedlemmen fortfarande aktiv i sin roll?',
                                  type: 'radio',
                                  required: true,
                                  order: 3,
                                  options: [
                                    { id: 'family-resigned-yes', label: 'Ja', value: 'yes' },
                                    { 
                                      id: 'family-resigned-no', 
                                      label: 'Nej', 
                                      value: 'no',
                                      followUpQuestions: [
                                        {
                                          id: 'family-pep-resignation-date',
                                          text: 'Ange datum då familjemedlemmen trädde ur PEP-ställningen:',
                                          type: 'date',
                                          required: true,
                                          order: 1
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              id: 'colleague-pep',
                              label: 'Jag är känd medarbetare till en PEP',
                              value: 'colleague-pep',
                              followUpQuestions: [
                                {
                                  id: 'colleague-pep-name-title',
                                  text: 'Ange namn och titel för PEP',
                                  type: 'freetext',
                                  required: true,
                                  order: 1,
                                  textConfig: {
                                    placeholder: 'Exempel: John Doe, Minister för utrikesärenden'
                                  }
                                },
                                {
                                  id: 'colleague-pep-country',
                                  text: 'Ange land eller organisation för PEP',
                                  type: 'freetext',
                                  required: true,
                                  order: 2,
                                  textConfig: {
                                    placeholder: 'Exempel: Sverige, EU, FN'
                                  }
                                },
                                {
                                  id: 'colleague-pep-resigned',
                                  text: 'Är medarbetaren fortfarande aktiv i sin roll?',
                                  type: 'radio',
                                  required: true,
                                  order: 3,
                                  options: [
                                    { id: 'colleague-resigned-yes', label: 'Ja', value: 'yes' },
                                    { 
                                      id: 'colleague-resigned-no', 
                                      label: 'Nej', 
                                      value: 'no',
                                      followUpQuestions: [
                                        {
                                          id: 'colleague-pep-resignation-date',
                                          text: 'Ange datum då medarbetaren trädde ur PEP-ställningen:',
                                          type: 'date',
                                          required: true,
                                          order: 1
                                        }
                                      ]
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              id: 'both-pep',
                              label: 'Jag är själv en PEP och jag är familjemedlem eller känd medarbetare till en PEP',
                              value: 'both-pep',
                              followUpQuestions: [
                                {
                                  id: 'both-self-title',
                                  text: 'Ange din titel',
                                  type: 'radio',
                                  required: true,
                                  order: 1,
                                  options: [
                                    { id: 'head-of-state-government', label: 'Stats- eller regeringschef', value: 'head-of-state-government' },
                                    { id: 'minister', label: 'Minister eller vice/biträdande minister', value: 'minister' },
                                    { id: 'parliament-member', label: 'Parlamentsledamot', value: 'parliament-member' },
                                    { id: 'supreme-court-judge', label: 'Domare i högsta domstolen', value: 'supreme-court-judge' },
                                    { id: 'constitutional-court', label: 'Konstitutionell domstol eller liknande befattning', value: 'constitutional-court' },
                                    { id: 'audit-central-bank', label: 'Högre tjänsteman vid revisionsmyndighet eller ledamot i centralbanks styrande organ', value: 'audit-central-bank' },
                                    { id: 'ambassador', label: 'Ambassadör', value: 'ambassador' },
                                    { id: 'military-diplomat', label: 'Beskickningschef eller hög officer i försvarsmakten', value: 'military-diplomat' },
                                    { id: 'state-enterprise', label: 'Person som ingår i statsägt företags förvaltning, lednings- eller kontrollorgan', value: 'state-enterprise' },
                                    { id: 'international-org', label: 'Ledande befattning i mellanstatlig organisation eller medlem i dess högsta ledning', value: 'international-org' },
                                    { id: 'political-party', label: 'Ledamot i styrelsen för ett politiskt parti', value: 'political-party' },
                                    { 
                                      id: 'other-title', 
                                      label: 'Annat (Vänligen ange)', 
                                      value: 'other-title',
                                      followUpQuestions: [
                                        {
                                          id: 'both-other-title-specify',
                                          text: 'Ange din titel:',
                                          type: 'freetext',
                                          required: true,
                                          order: 1,
                                          textConfig: {
                                            placeholder: 'Ange din specifika titel...',
                                            maxLength: 150
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  id: 'both-self-country',
                                  text: 'Ange land eller organisation för dig som PEP',
                                  type: 'market-selector',
                                  required: true,
                                  order: 2,
                                  marketConfig: {
                                    allowMultiple: false,
                                    markets: ['Sverige', 'Norge', 'Danmark', 'Finland', 'Island', 'Tyskland', 'Frankrike', 'Storbritannien', 'Nederländerna', 'Belgien', 'Spanien', 'Italien', 'Polen', 'Österrike', 'Schweiz', 'USA', 'Kanada', 'Australien', 'EU', 'FN', 'Other']
                                  }
                                },
                                {
                                  id: 'both-self-resigned',
                                  text: 'Är du fortfarande aktiv i din roll?',
                                  type: 'radio',
                                  required: true,
                                  order: 3,
                                  options: [
                                    { id: 'both-self-resigned-yes', label: 'Ja', value: 'yes' },
                                    { 
                                      id: 'both-self-resigned-no', 
                                      label: 'Nej', 
                                      value: 'no',
                                      followUpQuestions: [
                                        {
                                          id: 'both-self-pep-resignation-date',
                                          text: 'Ange datum då du trädde ur PEP-ställningen:',
                                          type: 'date',
                                          required: true,
                                          order: 1
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  id: 'both-rca-relation',
                                  text: 'Ange relation till PEP',
                                  type: 'radio',
                                  required: true,
                                  order: 4,
                                  options: [
                                    { id: 'family-member', label: 'Familjemedlem', value: 'family-member' },
                                    { id: 'known-associate', label: 'Känd medarbetare', value: 'known-associate' }
                                  ]
                                },
                                {
                                  id: 'both-rca-title',
                                  text: 'Befattning eller titel PEP',
                                  type: 'radio',
                                  required: true,
                                  order: 5,
                                  options: [
                                    { id: 'head-of-state-government', label: 'Stats- eller regeringschef', value: 'head-of-state-government' },
                                    { id: 'minister', label: 'Minister eller vice/biträdande minister', value: 'minister' },
                                    { id: 'parliament-member', label: 'Parlamentsledamot', value: 'parliament-member' },
                                    { id: 'supreme-court-judge', label: 'Domare i högsta domstolen', value: 'supreme-court-judge' },
                                    { id: 'constitutional-court', label: 'Konstitutionell domstol eller liknande befattning', value: 'constitutional-court' },
                                    { id: 'audit-central-bank', label: 'Högre tjänsteman vid revisionsmyndighet eller ledamot i centralbanks styrande organ', value: 'audit-central-bank' },
                                    { id: 'ambassador', label: 'Ambassadör', value: 'ambassador' },
                                    { id: 'military-diplomat', label: 'Beskickningschef eller hög officer i försvarsmakten', value: 'military-diplomat' },
                                    { id: 'state-enterprise', label: 'Person som ingår i statsägt företags förvaltning, lednings- eller kontrollorgan', value: 'state-enterprise' },
                                    { id: 'international-org', label: 'Ledande befattning i mellanstatlig organisation eller medlem i dess högsta ledning', value: 'international-org' },
                                    { id: 'political-party', label: 'Ledamot i styrelsen för ett politiskt parti', value: 'political-party' },
                                    { 
                                      id: 'other-title', 
                                      label: 'Annat (Vänligen ange)', 
                                      value: 'other-title',
                                      followUpQuestions: [
                                        {
                                          id: 'both-rca-other-title-specify',
                                          text: 'Ange PEP:s titel:',
                                          type: 'freetext',
                                          required: true,
                                          order: 1,
                                          textConfig: {
                                            placeholder: 'Ange den andra personens specifika titel...',
                                            maxLength: 150
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                {
                                  id: 'both-rca-country',
                                  text: 'Ange land eller organisation för PEP',
                                  type: 'market-selector',
                                  required: true,
                                  order: 6,
                                  marketConfig: {
                                    allowMultiple: false,
                                    markets: ['Sverige', 'Norge', 'Danmark', 'Finland', 'Island', 'Tyskland', 'Frankrike', 'Storbritannien', 'Nederländerna', 'Belgien', 'Spanien', 'Italien', 'Polen', 'Österrike', 'Schweiz', 'USA', 'Kanada', 'Australien', 'EU', 'FN', 'Other']
                                  }
                                },
                                {
                                  id: 'both-rca-resigned',
                                  text: 'Är personen fortfarande aktiv i sin roll?',
                                  type: 'radio',
                                  required: true,
                                  order: 7,
                                  options: [
                                    { id: 'both-rca-resigned-yes', label: 'Ja', value: 'yes' },
                                    { 
                                      id: 'both-rca-resigned-no', 
                                      label: 'Nej', 
                                      value: 'no',
                                      followUpQuestions: [
                                        {
                                          id: 'both-rca-pep-resignation-date',
                                          text: 'Ange datum då PEP:n trädde ur ställningen:',
                                          type: 'date',
                                          required: true,
                                          order: 1
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
                    },
                    {
                      id: 'no-pep-status',
                      label: 'Nej',
                      value: 'no'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'consumer-creditcard',
          title: 'Credit Card',
          description: 'Questions about your credit card',
          order: 2,
          subgroups: [
            {
              id: 'consumer-creditcard-main',
              title: 'Frågor om ditt kreditkort',
              order: 1,
              questions: [
                {
                  id: 'credit-purpose',
                  text: 'Vad är syftet med krediten? (Flera svarsalternativ är möjliga)',
                  type: 'dropdown-multiple',
                  required: true,
                  order: 1,
                  options: [
                    { 
                      id: 'daily-purchases', 
                      label: 'Vardagliga köp och räkningar (mat, drivmedel, apotek, el m.m.)', 
                      value: 'daily-purchases' 
                    },
                    { 
                      id: 'e-commerce', 
                      label: 'E-handel och abonnemang (streaming, mobil, gym, m.m.)', 
                      value: 'e-commerce' 
                    },
                    { 
                      id: 'travel', 
                      label: 'Resor och utlandsköp (biljetter, hotell, hyrbil)', 
                      value: 'travel' 
                    },
                    { 
                      id: 'large-purchases', 
                      label: 'Större planerat engångsköp (t.ex. hemelektronik/möbler)', 
                      value: 'large-purchases' 
                    },
                    { 
                      id: 'emergency', 
                      label: 'Tillfälliga/oförutsedda utgifter (buffert)', 
                      value: 'emergency' 
                    },
                    { 
                      id: 'balance-transfer', 
                      label: 'Överföring/saldoöverföring från annat kreditkort ("balance transfer"/samlingskredit på kort)', 
                      value: 'balance-transfer',
                      followUpQuestions: [
                        {
                          id: 'international-transfers',
                          text: 'Kommer kortet att användas för att skicka eller ta emot pengar från en annan kortinnehavare i utlandet?',
                          type: 'radio',
                          required: true,
                          order: 1,
                          options: [
                            { id: 'yes-international', label: 'Ja', value: 'yes-international',
                              followUpQuestions: [
                                {
                                  id: 'transfer-countries',
                                  text: 'Ange länder:',
                                  type: 'market-selector',
                                  required: true,
                                  order: 1,
                                  marketConfig: {
                                    allowMultiple: true,
                                    markets: ['Sverige', 'Norge', 'Danmark', 'Finland', 'Island', 'Tyskland', 'Frankrike', 'Storbritannien', 'Nederländerna', 'Belgien', 'Spanien', 'Italien', 'Polen', 'Österrike', 'Schweiz', 'USA', 'Kanada', 'Australien', 'Other']
                                  }
                                }
                              ]
                            },
                            { id: 'no-international', label: 'Nej', value: 'no-international' }
                          ]
                        }
                      ]
                    },
                    { 
                      id: 'cash-withdrawal', 
                      label: 'Kontantuttag', 
                      value: 'cash-withdrawal' 
                    },
                    { 
                      id: 'business-payments', 
                      label: 'Betalningar kopplade till egen/annans affärsverksamhet', 
                      value: 'business-payments' 
                    },
                    { 
                      id: 'investments', 
                      label: 'Investeringar/värdepapper/krypto', 
                      value: 'investments' 
                    },
                    { 
                      id: 'gambling', 
                      label: 'Spel/betting', 
                      value: 'gambling' 
                    },
                    { 
                      id: 'person-transfers', 
                      label: 'Överföringar till privatpersoner', 
                      value: 'person-transfers' 
                    },
                    { 
                      id: 'other-specify', 
                      label: 'Annat (beskriv kort)', 
                      value: 'other-specify',
                      followUpQuestions: [
                        {
                          id: 'other-description',
                          text: 'Beskriv kort vad annat syftet är:',
                          type: 'freetext',
                          required: true,
                          order: 1,
                          textConfig: {
                            maxLength: 200,
                            placeholder: 'Ange en kort beskrivning...'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 'expected-monthly-usage',
                  text: 'Hur mycket av limiten förväntar du dig att använda i genomsnitt per månad?',
                  type: 'radio',
                  required: true,
                  order: 2,
                  options: [
                    { id: '0-5000', label: '0 - 5000 kr', value: '0-5000' },
                    { id: '5000-10000', label: '5 000 - 10 000 kr', value: '5000-10000' },
                    { id: '10000-25000', label: '10 000 - 25 000 kr', value: '10000-25000' },
                    { 
                      id: 'over-25000', 
                      label: 'Mer än 25 000 kr', 
                      value: 'over-25000',
                      followUpQuestions: [
                        {
                          id: 'specify-amount',
                          text: 'Vänligen ange belopp:',
                          type: 'number',
                          required: true,
                          order: 1,
                          numberConfig: {
                            min: 25001,
                            placeholder: 'Ange belopp i SEK'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 'consumer-creditcard-usage',
              title: 'Användningsmönster',
              order: 2,
              questions: [
                {
                  id: 'monthly-purchases',
                  text: 'Hur många köp kommer du i genomsnitt göra i månaden?',
                  type: 'radio',
                  required: true,
                  order: 1,
                  options: [
                    { id: '0-10', label: '0–10', value: '0-10' },
                    { id: '11-30', label: '11–30', value: '11-30' },
                    { id: '31-50', label: '31–50', value: '31-50' },
                    { id: 'over-50', label: 'Över 50', value: 'over-50' }
                  ]
                },
                {
                  id: 'cash-withdrawals',
                  text: 'Hur mycket kommer du ta ut i kontanter i Sverige per månad?',
                  type: 'radio',
                  required: true,
                  order: 2,
                  options: [
                    { id: '0-1500', label: '0 - 1 500 SEK', value: '0-1500' },
                    { id: '1501-4000', label: '1 501 – 4 000 SEK', value: '1501-4000' },
                    { id: '4001-6000', label: '4 001 – 6 000 SEK', value: '4001-6000' },
                    { id: 'over-6000', label: 'Över 6 000 SEK', value: 'over-6000' }
                  ]
                },
                {
                  id: 'repayment-frequency',
                  text: 'Hur ofta kommer du betala av krediten?',
                  type: 'radio',
                  required: true,
                  order: 3,
                  options: [
                    { id: '1-2-times', label: '1–2 ggr per månad', value: '1-2-times' },
                    { id: '3-5-times', label: '3–5 ggr per månad', value: '3-5-times' },
                    { id: 'more-than-5', label: 'Mer än 5 ggr per månad', value: 'more-than-5' }
                  ]
                },
                {
                  id: 'account-depositors',
                  text: 'Vem kommer att göra återbetalningar på kontot? (Flera svarsalternativ är möjliga)',
                  type: 'dropdown-multiple',
                  required: true,
                  order: 4,
                  options: [
                    { id: 'account-holder', label: 'Kontohavare', value: 'account-holder' },
                    { id: 'joint-holder', label: 'Ev. medkontohavare', value: 'joint-holder' },
                    { id: 'legal-representative', label: 'God man/förvaltare/förmyndare (vid ställföreträdarskap)', value: 'legal-representative' },
                    { 
                      id: 'other-depositor', 
                      label: 'Annan', 
                      value: 'other-depositor',
                      followUpQuestions: [
                        {
                          id: 'other-depositor-details',
                          text: 'Ange vem/vilka som kommer göra återbetalningar på kontot:',
                          type: 'freetext',
                          required: true,
                          order: 1,
                          textConfig: {
                            maxLength: 200,
                            placeholder: 'Beskriv vem som kommer göra återbetalningar...'
                          }
                        },
                        {
                          id: 'other-depositor-relation',
                          text: 'Ange relation till återbetalare:',
                          type: 'freetext',
                          required: true,
                          order: 2,
                          textConfig: {
                            maxLength: 150,
                            placeholder: 'T.ex. maka/make, barn, förälder, vän, kollega...'
                          }
                        },
                        {
                          id: 'other-depositor-purpose',
                          text: 'Ange syfte att annan återbetalare finns:',
                          type: 'freetext',
                          required: true,
                          order: 3,
                          textConfig: {
                            maxLength: 250,
                            placeholder: 'Förklara varför någon annan ska göra återbetalningar på kontot...'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'consumer-deposits',
          title: 'Deposits',
          description: 'Questions about your savings account',
          order: 3,
          subgroups: [
            {
              id: 'consumer-deposits-main',
              title: 'Frågor om ditt sparkonto',
              order: 1,
              questions: [
                {
                  id: 'account-purpose',
                  text: 'Vad är syftet med kontot? (Flera svarsalternativ är möjliga)',
                  type: 'dropdown-multiple',
                  required: true,
                  order: 1,
                  options: [
                    { id: 'emergency-buffer', label: 'Buffert / oförutsedda utgifter', value: 'emergency-buffer' },
                    { id: 'monthly-savings', label: 'Regelbundet månadssparande', value: 'monthly-savings' },
                    { id: 'long-term-savings', label: 'Långsiktigt sparande (3+ år)', value: 'long-term-savings' },
                    { id: 'child-savings', label: 'Sparande till barn/ungdom', value: 'child-savings' },
                    { id: 'housing-savings', label: 'Boendespar / kontantinsats', value: 'housing-savings' },
                    { id: 'major-purchases', label: 'Bil / renovering / större köp', value: 'major-purchases' },
                    { id: 'travel-vacation', label: 'Resor / semester', value: 'travel-vacation' },
                    { id: 'education', label: 'Studier / utbildning', value: 'education' },
                    { id: 'tax-reserves', label: 'Skatt / avgifter (avsättning)', value: 'tax-reserves' },
                    { id: 'investment-parking', label: 'Parkering av likvida medel inför investering (aktier/fonder)', value: 'investment-parking' },
                    { id: 'lump-sum-receipt', label: 'Mottagande av engångsbelopp (arv, gåva, försäkring, försäljning)', value: 'lump-sum-receipt' },
                    { id: 'international-transfers', label: 'Överföringar till/från utlandet (remitteringar)', value: 'international-transfers' },
                    { id: 'person-transfers', label: 'Överföringar till privatpersoner utanför hushållet', value: 'person-transfers' },
                    { id: 'business-use', label: 'Användning kopplad till egen näringsverksamhet (styr mot företagsprodukt)', value: 'business-use' },
                    { id: 'crypto-trading', label: 'Koppling till krypto-/tradingplattform', value: 'crypto-trading' },
                    { id: 'gambling', label: 'Spel/betting', value: 'gambling' },
                    { 
                      id: 'other-specify', 
                      label: 'Annat (beskriv kort)', 
                      value: 'other-specify',
                      followUpQuestions: [
                        {
                          id: 'purpose-description',
                          text: 'Ange vad sparkontot skall användas till:',
                          type: 'freetext',
                          required: true,
                          order: 1,
                          textConfig: {
                            maxLength: 200,
                            placeholder: 'Beskriv vad sparkontot ska användas till...'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 'consumer-deposits-operations',
              title: 'Insättningar och transaktioner',
              order: 2,
              questions: [
                {
                  id: 'deposit-frequency',
                  text: 'Hur ofta kommer insättningar att göras på kontot?',
                  type: 'radio',
                  required: true,
                  order: 1,
                  options: [
                    { id: '0-2-times', label: '0–2 ggr per månad', value: '0-2-times' },
                    { id: '3-5-times', label: '3–5 ggr per månad', value: '3-5-times' },
                    { id: 'more-than-5', label: 'Mer än 5 ggr per månad', value: 'more-than-5' }
                  ]
                },
                {
                  id: 'withdrawal-frequency',
                  text: 'Hur ofta kommer löpande uttag att göras på kontot per månad?',
                  type: 'radio',
                  required: true,
                  order: 2,
                  options: [
                    { id: '0-2-withdrawals', label: '0–2 ggr per månad', value: '0-2-withdrawals' },
                    { id: '3-5-withdrawals', label: '3–5 ggr per månad', value: '3-5-withdrawals' },
                    { 
                      id: 'more-than-5-withdrawals', 
                      label: 'Mer än 5 ggr per månad', 
                      value: 'more-than-5-withdrawals',
                      followUpQuestions: [
                        {
                          id: 'withdrawal-frequency-details',
                          text: 'Vänligen ange hur ofta uttag kommer att göras (ggr/mån):',
                          type: 'freetext',
                          required: true,
                          order: 1,
                          textConfig: {
                            maxLength: 50,
                            placeholder: 'Ange antal gånger per månad'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 'withdrawal-amount',
                  text: 'Hur stora kommer dina uttag att vara per månad?',
                  type: 'radio',
                  required: true,
                  order: 3,
                  options: [
                    { id: 'under-5k', label: 'Mindre än 5 000 SEK', value: 'under-5k' },
                    { id: '5k-9k', label: '5 000 – 9 999 SEK', value: '5k-9k' },
                    { id: '10k-24k', label: '10 000 – 24 999 SEK', value: '10k-24k' },
                    { id: '25k-49k', label: '25 000 – 49 999 SEK', value: '25k-49k' },
                    { id: '50k-plus', label: '50 000 SEK eller mer', value: '50k-plus' }
                  ]
                },
                {
                  id: 'initial-deposit-amount',
                  text: 'Hur mycket pengar kommer du att sätta in initialt (första 3 månaderna) vid öppnande av sparkontot?',
                  type: 'radio',
                  required: true,
                  order: 4,
                  options: [
                    { id: 'under-10k', label: 'Mindre än 10 000 SEK', value: 'under-10k' },
                    { id: '10k-49k', label: '10 000 – 49 999 SEK', value: '10k-49k' },
                    { id: '50k-99k', label: '50 000 – 99 999 SEK', value: '50k-99k' },
                    { id: '100k-499k', label: '100 000 – 499 999 SEK', value: '100k-499k' },
                    { id: '500k-plus', label: '500 000 SEK eller mer', value: '500k-plus' }
                  ]
                },
                {
                  id: 'monthly-deposit-amount',
                  text: 'Hur stora kommer dina insättningar att vara per månad?',
                  type: 'radio',
                  required: true,
                  order: 5,
                  options: [
                    { id: 'under-5k', label: 'Mindre än 5 000 SEK', value: 'under-5k' },
                    { id: '5k-9k', label: '5 000 – 9 999 SEK', value: '5k-9k' },
                    { id: '10k-24k', label: '10 000 – 24 999 SEK', value: '10k-24k' },
                    { id: '25k-49k', label: '25 000 – 49 999 SEK', value: '25k-49k' },
                    { id: '50k-plus', label: '50 000 SEK eller mer', value: '50k-plus' }
                  ]
                },
                {
                  id: 'deposit-depositors',
                  text: 'Vem kommer att göra insättningar på kontot? (Flera svarsalternativ är möjliga)',
                  type: 'dropdown-multiple',
                  required: true,
                  order: 6,
                  options: [
                    { id: 'account-holder', label: 'Kontohavare', value: 'account-holder' },
                    { id: 'joint-holder', label: 'Ev. medkontohavare', value: 'joint-holder' },
                    { id: 'legal-representative', label: 'God man/förvaltare/förmyndare (vid ställföreträdarskap)', value: 'legal-representative' },
                    { 
                      id: 'other-depositor', 
                      label: 'Annan', 
                      value: 'other-depositor',
                      followUpQuestions: [
                        {
                          id: 'deposit-other-depositor-details',
                          text: 'Ange vem/vilka som kommer göra insättningar på kontot:',
                          type: 'freetext',
                          required: true,
                          order: 1,
                          textConfig: {
                            maxLength: 200,
                            placeholder: 'Beskriv vem som kommer göra insättningar...'
                          }
                        },
                        {
                          id: 'deposit-other-depositor-relation',
                          text: 'Ange relation till insättare:',
                          type: 'freetext',
                          required: true,
                          order: 2,
                          textConfig: {
                            maxLength: 150,
                            placeholder: 'T.ex. maka/make, barn, förälder, vän, kollega...'
                          }
                        },
                        {
                          id: 'deposit-other-depositor-purpose',
                          text: 'Ange syfte att annan insättare finns:',
                          type: 'freetext',
                          required: true,
                          order: 3,
                          textConfig: {
                            maxLength: 250,
                            placeholder: 'Förklara varför någon annan ska göra insättningar på kontot...'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 'deposit-origin-country',
                  text: 'Från vilket land kommer insättningarna?',
                  type: 'radio',
                  required: true,
                  order: 6,
                  options: [
                    { id: 'sweden', label: 'Sverige', value: 'sweden' },
                    { 
                      id: 'eu-ees', 
                      label: 'Land inom EU/EES', 
                      value: 'eu-ees',
                      followUpQuestions: [
                        {
                          id: 'eu-country-selection',
                          text: 'Välj vilket EU/EES land:',
                          type: 'market-selector',
                          required: true,
                          order: 1,
                          marketConfig: {
                            allowMultiple: false,
                            markets: ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain']
                          }
                        }
                      ]
                    },
                    { 
                      id: 'non-eu', 
                      label: 'Land utanför EU/EES', 
                      value: 'non-eu',
                      followUpQuestions: [
                        {
                          id: 'non-eu-country-selection',
                          text: 'Välj vilket land utanför EU/EES:',
                          type: 'market-selector',
                          required: true,
                          order: 1,
                          marketConfig: {
                            allowMultiple: false,
                            markets: ['United States', 'Canada', 'United Kingdom', 'Switzerland', 'Japan', 'Australia', 'New Zealand', 'Singapore', 'Hong Kong', 'South Korea', 'China', 'India', 'Brazil', 'Russia', 'Other']
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'consumer-loan',
          title: 'Loan',
          description: 'Questions about your loan',
          order: 4,
          subgroups: [
            {
              id: 'consumer-loan-purpose',
              title: 'Lånets syfte',
              order: 1,
              questions: [
                {
                  id: 'loan-purpose-multi',
                  text: 'Vad är syftet med lånet? (Flera svarsalternativ är möjliga)',
                  type: 'dropdown-multiple',
                  required: true,
                  order: 1,
                  options: [
                    { id: 'debt-consolidation', label: 'Samlingslån / lösa dyra krediter', value: 'debt-consolidation' },
                    { id: 'vehicle-boat', label: 'Bil / husbil / båt eller liknande', value: 'vehicle-boat' },
                    { id: 'home-renovation', label: 'Renovering / energiåtgärder i bostad', value: 'home-renovation' },
                    { id: 'furniture-appliances', label: 'Möbler / hemelektronik / vitvaror', value: 'furniture-appliances' },
                    { id: 'moving-housing', label: 'Flytt / deposition / startkostnader för boende', value: 'moving-housing' },
                    { id: 'house-downpayment', label: 'Kontantinsats till bostad', value: 'house-downpayment' },
                    { id: 'travel-vacation', label: 'Resa / semester', value: 'travel-vacation' },
                    { id: 'wedding-celebration', label: 'Bröllop / större högtid', value: 'wedding-celebration' },
                    { id: 'healthcare-dental', label: 'Tandvård / sjukvård', value: 'healthcare-dental' },
                    { id: 'education-studies', label: 'Studier / utbildning (ej CSN)', value: 'education-studies' },
                    { id: 'children-expenses', label: 'Barnrelaterade kostnader', value: 'children-expenses' },
                    { id: 'tax-fees', label: 'Skatt / avgifter', value: 'tax-fees' },
                    { id: 'business-start', label: 'Företagsstart / näringsverksamhet', value: 'business-start' },
                    { id: 'investments', label: 'Investeringar / värdepapper / krypto', value: 'investments' },
                    { id: 'gambling', label: 'Spel / betting', value: 'gambling' },
                    { 
                      id: 'other-describe', 
                      label: 'Annat (beskriv kort)', 
                      value: 'other-describe',
                      followUpQuestions: [
                        {
                          id: 'loan-purpose-description',
                          text: 'Ange vad lånet skall användas till:',
                          type: 'freetext',
                          required: true,
                          order: 1,
                          textConfig: {
                            maxLength: 200,
                            placeholder: 'Beskriv kort vad lånet ska användas till...'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: 'consumer-loan-operations',
              title: 'Lånehantering och betalningar',
              order: 2,
              questions: [
                {
                  id: 'extra-amortizations',
                  text: 'Kommer extraamorteringar (betalningar utöver betalplan) att genomföras under lånets löptid?',
                  type: 'radio',
                  required: true,
                  order: 1,
                  options: [
                    { 
                      id: 'yes-extra-payments', 
                      label: 'Ja', 
                      value: 'yes-extra-payments',
                      followUpQuestions: [
                        {
                          id: 'extra-payment-frequency',
                          text: 'Hur ofta kommer extraamorteringar att göras?',
                          type: 'number',
                          required: true,
                          order: 1,
                          numberConfig: {
                            min: 1,
                            max: 365,
                            placeholder: 'Ange antal gånger per år'
                          }
                        }
                      ]
                    },
                    { id: 'no-extra-payments', label: 'Nej', value: 'no-extra-payments' }
                  ]
                },
                {
                  id: 'loan-depositors',
                  text: 'Vem kommer att göra insättningar på kontot? (Flera svarsalternativ är möjliga)',
                  type: 'dropdown-multiple',
                  required: true,
                  order: 2,
                  options: [
                    { id: 'account-holder', label: 'Kontohavare', value: 'account-holder' },
                    { id: 'co-account-holder', label: 'Ev. medkontohavare', value: 'co-account-holder' },
                    { id: 'legal-representative', label: 'God man/förvaltare/förmyndare (vid ställföreträdarskap)', value: 'legal-representative' },
                    { 
                      id: 'other', 
                      label: 'Annan', 
                      value: 'other',
                      followUpQuestions: [
                        {
                          id: 'loan-other-depositors',
                          text: 'Ange vem/vilka som kommer göra insättningar på kontot:',
                          type: 'freetext',
                          required: true,
                          order: 1,
                          textConfig: {
                            maxLength: 200,
                            placeholder: 'Beskriv vem som kommer göra insättningar...'
                          }
                        },
                        {
                          id: 'loan-other-depositor-relation',
                          text: 'Ange relation till insättare:',
                          type: 'freetext',
                          required: true,
                          order: 2,
                          textConfig: {
                            maxLength: 150,
                            placeholder: 'T.ex. maka/make, barn, förälder, vän, kollega...'
                          }
                        },
                        {
                          id: 'loan-other-depositor-purpose',
                          text: 'Ange syfte att annan insättare finns:',
                          type: 'freetext',
                          required: true,
                          order: 3,
                          textConfig: {
                            maxLength: 250,
                            placeholder: 'Förklara varför någon annan ska göra insättningar på kontot...'
                          }
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 'loan-payment-source-country',
                  text: 'Från vilket land kommer inbetalningarna?',
                  type: 'radio',
                  required: true,
                  order: 3,
                  options: [
                    { id: 'sweden', label: 'Sverige', value: 'sweden' },
                    { 
                      id: 'eu-ees', 
                      label: 'Land inom EU/EES', 
                      value: 'eu-ees',
                      followUpQuestions: [
                        {
                          id: 'eu-country-selection',
                          text: 'Välj vilket land inom EU/EES:',
                          type: 'market-selector',
                          required: true,
                          order: 1,
                          marketConfig: {
                            allowMultiple: false,
                            markets: ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Iceland', 'Liechtenstein', 'Norway']
                          }
                        }
                      ]
                    },
                    { 
                      id: 'non-eu', 
                      label: 'Land utanför EU/EES', 
                      value: 'non-eu',
                      followUpQuestions: [
                        {
                          id: 'non-eu-country-selection',
                          text: 'Välj vilket land utanför EU/EES:',
                          type: 'market-selector',
                          required: true,
                          order: 1,
                          marketConfig: {
                            allowMultiple: false,
                            markets: ['United States', 'Canada', 'United Kingdom', 'Switzerland', 'Japan', 'Australia', 'New Zealand', 'Singapore', 'Hong Kong', 'South Korea', 'China', 'India', 'Brazil', 'Russia', 'Other']
                          }
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
    },
    {
      id: 'company-segment',
      type: 'company',
      title: 'Company KYC',
      description: 'Questions for companies',
      groups: [
        {
          id: 'company-general',
          title: 'General',
          description: 'General questions for companies',
          order: 1,
          subgroups: [
            {
              id: 'company-general-main',
              title: 'Company Information',
              order: 1,
              questions: [
                {
                  id: 'company-name',
                  text: 'What is your company name?',
                  type: 'freetext',
                  required: true,
                  order: 1
                },
                {
                  id: 'org-number',
                  text: 'What is your organization number?',
                  type: 'freetext',
                  required: true,
                  order: 2,
                  validation: {
                    pattern: '^[0-9]{6}-[0-9]{4}$',
                    message: 'Organization number must be in format XXXXXX-XXXX'
                  }
                }
              ],
              repeatableGroups: [
                {
                  id: 'beneficial-owners',
                  title: 'Beneficial Owners',
                  description: 'Information about beneficial owners (>25% ownership)',
                  minInstances: 1,
                  maxInstances: 10,
                  addButtonText: 'Add Beneficial Owner',
                  removeButtonText: 'Remove Owner',
                  questions: [
                    {
                      id: 'owner-name',
                      text: 'Full Name',
                      type: 'freetext',
                      required: true,
                      order: 1
                    },
                    {
                      id: 'owner-nationality',
                      text: 'Nationality',
                      type: 'market-selector',
                      required: true,
                      order: 2
                    },
                    {
                      id: 'ownership-percentage',
                      text: 'Ownership Percentage',
                      type: 'number',
                      required: true,
                      order: 3,
                      numberConfig: {
                        min: 25,
                        max: 100,
                        step: 0.1
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'company-deposits',
          title: 'Deposits',
          description: 'Company deposit questions',
          order: 2,
          subgroups: [
            {
              id: 'company-deposits-main',
              title: 'Company Deposit Information',
              order: 1,
              questions: [
                {
                  id: 'deposit-purpose-company',
                  text: 'What is the purpose of the company deposit account?',
                  type: 'dropdown-multiple',
                  required: true,
                  order: 1,
                  options: [
                    { id: 'operational', label: 'Operational funds', value: 'operational' },
                    { id: 'investment', label: 'Investment funds', value: 'investment' },
                    { id: 'payroll', label: 'Payroll account', value: 'payroll' },
                    { id: 'tax-reserves', label: 'Tax reserves', value: 'tax-reserves' }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'company-loan',
          title: 'Loan',
          description: 'Company loan questions',
          order: 3,
          subgroups: [
            {
              id: 'company-loan-main',
              title: 'Company Loan Information',
              order: 1,
              questions: [
                {
                  id: 'loan-purpose-company',
                  text: 'What is the purpose of the company loan?',
                  type: 'dropdown-single',
                  required: true,
                  order: 1,
                  options: [
                    { id: 'expansion', label: 'Business expansion', value: 'expansion' },
                    { id: 'equipment', label: 'Equipment purchase', value: 'equipment' },
                    { id: 'working-capital', label: 'Working capital', value: 'working-capital' },
                    { id: 'real-estate', label: 'Real estate purchase', value: 'real-estate' },
                    { id: 'refinancing', label: 'Refinancing existing debt', value: 'refinancing' }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  createdAt: '2025-09-15T00:00:00Z',
  updatedAt: '2025-09-15T00:00:00Z'
};
