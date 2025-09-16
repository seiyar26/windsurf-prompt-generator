'use client';

import { motion } from 'framer-motion';

export default function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Windsurf Prompts Matter So Much
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Think about it this way: basic prompts are like giving a junior developer vague instructions versus providing a detailed technical specification with requirements, edge cases, and expected behaviors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none text-gray-600 space-y-6"
        >
          <p className="text-xl font-semibold text-gray-900 mb-6">
            Great Windsurf prompts give the AI four critical things:
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Technical Context
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Framework-specific details that eliminate guesswork (like the difference between &quot;create a login page&quot; and &quot;create a login page using Vue.js with Pinia state management and JWT authentication&quot;)
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Structure Guidance
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A clear framework for organizing the code (imagine the difference between &quot;build an API&quot; and &quot;build a RESTful API with Node.js using a controller-service-repository pattern&quot;)
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Exception Handling
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Anticipation of potential issues (such as adding &quot;implement proper error handling for network failures and input validation&quot; to your request)
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Code Standards
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Preferred patterns and practices (like specifying &quot;follow TypeScript best practices with proper interface definitions&quot; or &quot;use async/await with try/catch blocks&quot;)
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 border border-gray-200 mt-12">
            <p className="text-lg text-gray-700">
              <strong>Every time you use a basic prompt, you&apos;re basically asking Windsurf&apos;s AI to read your mind.</strong> With engineered prompts, you&apos;re giving it a complete blueprint—and the quality difference is immediately obvious.
            </p>
            <p className="text-lg text-gray-700 mt-4">
              Our generator handles all this complexity automatically—<strong>transforming your simple request into the kind of prompt that professional developers use to get perfect code from Windsurf.</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
