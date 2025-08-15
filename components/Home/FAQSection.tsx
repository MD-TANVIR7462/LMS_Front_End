'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "How long do I have access to the courses?",
    answer: "You get lifetime access to all course materials, including any future updates and bonus content."
  },
  {
    question: "Do you offer certificates?",
    answer: "Yes, you'll receive a verified certificate of completion for each course you finish."
  },
  {
    question: "Can I get a refund?",
    answer: "We offer a 30-day money-back guarantee if you're not satisfied with any course."
  },
  {
    question: "Are there any prerequisites?",
    answer: "Most courses are beginner-friendly. Prerequisites are listed in course descriptions."
  },
  {
    question: "Can I download course materials?",
    answer: "Yes, videos and resources can be downloaded for offline viewing on our mobile app."
  }
];

export const FAQSection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-xl text-gray-600">
          Got questions? We've got answers to help you get started.
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-6">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`} 
            className="bg-gray-50 rounded-xl px-8 border-0 shadow-sm"
          >
            <AccordionTrigger className="text-left hover:text-gray-700 hover:no-underline py-6">
              <span className="font-bold text-lg text-black">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-6 text-lg leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);