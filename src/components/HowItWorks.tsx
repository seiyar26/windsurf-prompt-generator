'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How This Windsurf Prompt Generator Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <strong>Frustrated with Windsurf generating code that breaks when you try to use it?</strong> You&apos;re not alone. 
            While some developers get flawless code from Windsurf&apos;s AI, most waste hours fixing bugs and rewriting what should have worked the first time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none text-gray-600 space-y-6"
        >
          <p>
            Here&apos;s the secret most don&apos;t share: <strong>developers getting perfect code from Windsurf aren&apos;t coding wizards—they&apos;ve just mastered the art of prompting.</strong> And I&apos;m about to hand you that exact same power.
          </p>

          <p>
            Our Windsurf Prompt Generator is like having a senior developer craft your AI requests. It takes your simple coding task and transforms it into a precision-engineered prompt that Windsurf&apos;s AI can&apos;t misinterpret.
          </p>

          <p>
            How? By automatically applying four essential elements that make Windsurf prompts generate working code:
          </p>

          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Technical specifications (the requirements)</li>
            <li>Codebase context (the environment)</li>
            <li>Error prevention guidelines (the guardrails)</li>
            <li>Quality control parameters (the standards)</li>
          </ol>

          <p>
            <strong>The difference is remarkable.</strong> Where basic prompts get you buggy, incomplete code, engineered prompts deliver production-ready solutions that work the first time you run them.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Turn Simple Ideas Into Production-Ready Code
          </h3>
          
          <p className="text-xl text-gray-600 text-center mb-12">
            Getting error-free code from Windsurf is surprisingly simple:
          </p>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Describe Your Coding Task
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Have a feature to implement or a function to create? Just describe it in plain language—anything from &quot;build a user authentication system&quot; to &quot;create a data visualization dashboard with filtering.&quot; No need to overthink it!
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Wait Just Two Seconds
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Behind the scenes, our algorithm performs the prompt engineering magic that experienced developers have perfected through countless hours of Windsurf use. It&apos;s analyzing your requirements, adding technical details, and optimizing for clean code while you barely have time to blink.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">
                  3
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  Copy, Paste, and Watch the Magic
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Your expertly crafted prompt appears instantly. Copy it, paste it into Windsurf, and witness how much better the generated code becomes. No more endless debugging sessions or complete rewrites!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-gray-700 italic">
              <strong>Developer insider tip:</strong> While our generator works with any task description, mentioning your tech stack boosts quality even further. &quot;Create a payment form&quot; works great, but &quot;Create a React payment form with Stripe integration and form validation&quot; will generate nearly perfect, implementation-ready code.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
