import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnimatedCharacter } from '@/components/AnimatedCharacter';
import { FloatingElements } from '@/components/FloatingElements';
import { CustomCursor } from '@/components/CustomCursor';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Zap, 
  Eye, 
  Target, 
  BarChart3, 
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Landing = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen relative custom-cursor">
      <CustomCursor />
      <FloatingElements />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold gradient-text">InfluenceTracker</div>
          <div className="flex space-x-6">
            <a href="#problem" className="text-foreground hover:text-primary transition-colors">Problem</a>
            <a href="#solution" className="text-foreground hover:text-primary transition-colors">Solution</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <Link to="/form">
              <Button variant="gradient" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div ref={addToRefs} className="scroll-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-6 leading-tight">
              Track Influencers
              <br />
              <span className="text-4xl md:text-6xl text-muted-foreground">in Real-Time</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Never miss what influencers and competitors are posting about your niche. 
              Get AI-powered trend briefs delivered every 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/form">
                <Button variant="hero" size="xl" className="group">
                  Start Monitoring Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="glass" size="xl">
                Watch Demo
                <Eye className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div ref={addToRefs} className="scroll-fade-in mt-20">
            <AnimatedCharacter />
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section id="problem" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={addToRefs} className="scroll-fade-in text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-8">The Problem</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Brand teams are flying blind in the fast-paced world of social media influence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Clock className="w-12 h-12" />,
                title: "Real-Time Blindness",
                description: "Brand teams can't track what influencers post about their niche in real-time across multiple platforms"
              },
              {
                icon: <Eye className="w-12 h-12" />,
                title: "Competitor Invisibility", 
                description: "No visibility into what competitors and their influencers are doing across social platforms"
              },
              {
                icon: <TrendingUp className="w-12 h-12" />,
                title: "Missed Opportunities",
                description: "Trends and viral content opportunities are discovered too late to capitalize on them"
              }
            ].map((problem, index) => (
              <div key={index} ref={addToRefs} className="scroll-fade-in">
                <div className="glass-effect p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 h-full">
                  <div className="text-primary mb-6 flex justify-center">{problem.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">{problem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={addToRefs} className="scroll-fade-in text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-8">Our Solution</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AI-powered influencer monitoring that delivers actionable insights every 48 hours
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div ref={addToRefs} className="scroll-fade-in space-y-8">
              <div className="glass-effect p-6 rounded-xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Multi-Platform Tracking</h3>
                </div>
                <p className="text-muted-foreground">Monitor YouTube, Instagram, and LinkedIn simultaneously for comprehensive coverage.</p>
              </div>

              <div className="glass-effect p-6 rounded-xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">AI-Powered Analysis</h3>
                </div>
                <p className="text-muted-foreground">Advanced AI summarizes content and identifies emerging trends automatically.</p>
              </div>

              <div className="glass-effect p-6 rounded-xl">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">48-Hour Trend Briefs</h3>
                </div>
                <p className="text-muted-foreground">Regular reports delivered to your inbox with actionable insights and recommendations.</p>
              </div>
            </div>

            <div ref={addToRefs} className="scroll-fade-in">
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-3xl font-bold gradient-text mb-6">How It Works</h3>
                <div className="space-y-6">
                  {[
                    "Curate your list of influencers and competitors",
                    "Our AI monitors their content across platforms",
                    "Content is analyzed and trends are identified", 
                    "You receive detailed briefs every 48 hours",
                    "Stay ahead of trends and opportunities"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hackathon Info Section */}
      <section id="about" className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div ref={addToRefs} className="scroll-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8">Built for Innovation</h2>
            <div className="glass-effect p-12 rounded-2xl">
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                This platform was built as part of a hackathon to solve the real problem of 
                brand teams lacking real-time insights into influencer and competitor content.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-primary-dark">Technology Stack</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-primary" /> React & TypeScript</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-primary" /> AI-Powered Analysis</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-primary" /> Real-time Monitoring</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-primary" /> Automated Reporting</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-secondary-dark">Key Features</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-secondary" /> Multi-platform tracking</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-secondary" /> Intelligent summarization</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-secondary" /> Trend identification</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-secondary" /> Email automation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div ref={addToRefs} className="scroll-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-8">
              Ready to Start Monitoring?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Join the revolution in influencer monitoring. Get your first trend brief in just 48 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/form">
                <Button variant="hero" size="xl" className="group">
                  Get Your Trend Brief
                  <Target className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-muted-foreground mt-8">
              No credit card required • 2-3 minute setup • First brief within 48 hours
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-2xl font-bold gradient-text mb-4">InfluenceTracker</div>
          <p className="text-muted-foreground">
            Built with ❤️ for brand teams who want to stay ahead of trends
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;