import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomCursor } from '@/components/CustomCursor';
import { FloatingElements } from '@/components/FloatingElements';
import { Calendar } from '@/components/ui/calendar';
import { 
  ArrowLeft, 
  ArrowRight, 
  Search, 
  Mail, 
  CalendarIcon, 
  CheckCircle, 
  Sparkles,
  Users,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface FormData {
  influencerName: string;
  email: string;
  endDate: Date | undefined;
}

const FormPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    influencerName: '',
    email: '',
    endDate: undefined
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [influencerSuggestions, setInfluencerSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [emailError, setEmailError] = useState('');
  
  const formRef = useRef<HTMLDivElement>(null);

  // Mock influencer suggestions (in real app, this would be API call)
  const mockSuggestions = [
    'MrBeast', 'PewDiePie', 'Marques Brownlee', 'Emma Chamberlain', 'James Charles',
    'David Dobrik', 'Liza Koshy', 'Logan Paul', 'Jake Paul', 'Jeffree Star',
    'Shane Dawson', 'Tana Mongeau', 'Trisha Paytas', 'Belle Delphine', 'Nikocado Avocado'
  ];

  useEffect(() => {
    // Simulate API search for influencers
    if (formData.influencerName.length > 2) {
      const filtered = mockSuggestions.filter(name => 
        name.toLowerCase().includes(formData.influencerName.toLowerCase())
      );
      setInfluencerSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [formData.influencerName]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInfluencerSelect = (name: string) => {
    setFormData(prev => ({ ...prev, influencerName: name }));
    setShowSuggestions(false);
  };

  const handleNext = () => {
    if (currentStep === 1 && !formData.influencerName.trim()) {
      toast.error('Please select an influencer to monitor');
      return;
    }
    
    if (currentStep === 2) {
      if (!formData.email.trim()) {
        toast.error('Please enter your email address');
        return;
      }
      if (!validateEmail(formData.email)) {
        setEmailError('Please enter a valid email address');
        return;
      }
      setEmailError('');
    }
    
    if (currentStep === 3 && !formData.endDate) {
      toast.error('Please select an end date for monitoring');
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        influencerName: formData.influencerName,
        email: formData.email,
        endDate: formData.endDate?.toISOString().split('T')[0],
        timestamp: new Date().toISOString()
      };

      const response = await fetch('https://dhruvthc.app.n8n.cloud/webhook/5af31bd0-d969-40b7-929d-4fdb65433876', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success('Form submitted successfully!');
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast.error('Failed to submit form. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center relative custom-cursor">
        <CustomCursor />
        <FloatingElements />
        
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <div className="glass-effect p-12 rounded-2xl">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold gradient-text mb-6">
              Success! 🎉
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your monitoring request has been submitted successfully!
            </p>
            
            <div className="glass-effect p-6 rounded-xl mb-8 text-left">
              <h3 className="text-lg font-semibold mb-4 text-center">What happens next?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Please wait 2-3 minutes for processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-secondary" />
                  <span>Your first trend brief will arrive in your email</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span>Monitor {formData.influencerName} until {formData.endDate?.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="gradient" 
                size="lg" 
                onClick={() => {
                  setIsSuccess(false);
                  setCurrentStep(1);
                  setFormData({ influencerName: '', email: '', endDate: undefined });
                }}
              >
                Monitor Another Influencer
              </Button>
              
              <Link to="/">
                <Button variant="glass" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative custom-cursor">
      <CustomCursor />
      <FloatingElements />
      
      <div className="w-full max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-4">
            Start Monitoring
          </h1>
          <p className="text-xl text-muted-foreground">
            Set up your influencer monitoring in 3 simple steps
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-center space-x-4 mb-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300 ${
                  step <= currentStep
                    ? 'bg-gradient-to-r from-primary to-secondary shadow-lg scale-110'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div ref={formRef} className="glass-effect p-8 md:p-12 rounded-2xl">
          {/* Step 1: Influencer Selection */}
          <div className={`form-step ${currentStep === 1 ? 'active' : currentStep > 1 ? 'prev' : ''}`}>
            {currentStep === 1 && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Select Influencer</h2>
                <p className="text-muted-foreground mb-8">
                  Choose the influencer you want to monitor across social platforms
                </p>
                
                <div className="relative max-w-md mx-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search for influencers..."
                      value={formData.influencerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, influencerName: e.target.value }))}
                      className="pl-10 h-14 text-lg glass-effect border-0 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  {showSuggestions && influencerSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 glass-effect rounded-lg border border-border/50 overflow-hidden z-20">
                      {influencerSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleInfluencerSelect(suggestion)}
                          className="w-full px-4 py-3 text-left hover:bg-primary/10 transition-colors flex items-center space-x-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <span>{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {formData.influencerName && (
                  <div className="mt-8 p-4 glass-effect rounded-lg max-w-md mx-auto">
                    <p className="text-sm text-muted-foreground">Selected:</p>
                    <p className="font-semibold text-lg gradient-text">{formData.influencerName}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Step 2: Email Input */}
          <div className={`form-step ${currentStep === 2 ? 'active' : currentStep > 2 ? 'prev' : ''}`}>
            {currentStep === 2 && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Your Email</h2>
                <p className="text-muted-foreground mb-8">
                  We'll send your trend briefs and insights to this email address
                </p>
                
                <div className="max-w-md mx-auto">
                  <div className="input-floating">
                    <Input
                      type="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        setEmailError('');
                      }}
                      className={`h-14 text-lg glass-effect border-0 focus:ring-2 focus:ring-secondary peer ${
                        emailError ? 'ring-2 ring-red-500' : ''
                      }`}
                    />
                    <label className="text-muted-foreground">Email Address</label>
                  </div>
                  
                  {emailError && (
                    <p className="text-red-500 text-sm mt-2 text-left">{emailError}</p>
                  )}
                  
                  {formData.email && validateEmail(formData.email) && (
                    <div className="mt-4 p-3 glass-effect rounded-lg text-sm text-muted-foreground">
                      ✓ Trend briefs will be sent to {formData.email}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Date Selection */}
          <div className={`form-step ${currentStep === 3 ? 'active' : ''}`}>
            {currentStep === 3 && (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center mx-auto mb-6">
                  <CalendarIcon className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold mb-4">End Date</h2>
                <p className="text-muted-foreground mb-8">
                  Select until when you want to monitor this influencer
                </p>
                
                <div className="calendar-3d max-w-md mx-auto">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
                    disabled={(date) => date <= new Date()}
                    className="glass-effect rounded-lg border-0 p-4"
                    classNames={{
                      day_selected: "calendar-date selected",
                      day: "calendar-date hover:bg-primary/10 transition-all duration-200",
                    }}
                  />
                </div>
                
                {formData.endDate && (
                  <div className="mt-6 p-4 glass-effect rounded-lg max-w-md mx-auto">
                    <p className="text-sm text-muted-foreground">Monitoring until:</p>
                    <p className="font-semibold text-lg gradient-text">
                      {formData.endDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-border/50">
            <Button
              variant="glass"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Step {currentStep} of 3
              </p>
            </div>
            
            <Button
              variant="gradient"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex items-center space-x-2"
            >
              <span>{currentStep === 3 ? (isSubmitting ? 'Submitting...' : 'Start Monitoring') : 'Next'}</span>
              {currentStep < 3 ? <ArrowRight className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
