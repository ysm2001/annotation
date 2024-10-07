import { Users, Database, Sparkles, ArrowRight } from 'lucide-react';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-8 pt-20 pb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
            <Sparkles className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-600 font-medium">Innovating Data Annotation</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Welcome to the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mt-2">
              Crowd-Sourced Online Data Annotation Platform
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Join our community of annotators and researchers to contribute to the future of AI and machine learning
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Annotator Card */}
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-8 relative">
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Annotator</h2>
              </div>
              
              <ul className="space-y-4 mb-8 text-gray-600">
                <li className="flex items-start">
                  <ArrowRight className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Access to high-paying annotation tasks</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Join a community of like-minded professionals</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Flexible working hours and remote opportunities</span>
                </li>
              </ul>

              <a
                href="/login"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
              >
                Request an annotator account
              </a>
            </div>
          </div>

          {/* Academic User Card */}
          <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-8 relative">
              <div className="flex items-center mb-6">
                <Database className="w-8 h-8 text-indigo-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Academic User</h2>
              </div>
              
              <ul className="space-y-4 mb-8 text-gray-600">
                <li className="flex items-start">
                  <ArrowRight className="text-indigo-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Professional solutions for multiple scenarios</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="text-indigo-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Access to massive datasets (text, images, audio)</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="text-indigo-600 mr-2 mt-1 flex-shrink-0" />
                  <span>Customized annotation workflows</span>
                </li>
              </ul>

              <a
                href="/login"
                className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
              >
                Create an academic user account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
