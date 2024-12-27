import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, List, BarChart3 } from 'lucide-react';

const Mainpage = () => {
    const features = [
        {
            title: "Email Generation",
            description: "Create professional emails in seconds with our AI-powered templates. Perfect for business communication, marketing, and customer service.",
            icon: <Mail className="w-8 h-8 text-blue-500" />
        },
        {
            title: "Smart Contact Lists",
            description: "Effortlessly manage your contact lists for email campaigns. Upload a CSV file, and our AI will help organize, structure, and optimize your contacts for seamless outreach and engagement.",
            icon: <List className="w-8 h-8 text-blue-500" />
        },
        {
            title: "Email Marketing Automation",
            description: "Automate your email marketing campaigns with ease. Send targeted emails, track engagement, and boost conversions.",
            icon: <BarChart3 className="w-8 h-8 text-blue-500" />
        }
    ];

    const testimonials = [
        {
            text: "Swift AI has revolutionized how I handle my email communication. It's like having a professional writer on standby.",
            author: "Sarah Johnson",
            role: "Marketing Director",
           
        },
        {
            text: "The email generation feature saves me hours of work every week. The AI understands context perfectly.",
            author: "Michael Chen",
            role: "Project Manager",
            
        }
    ];

    return (
        <div className="home-container bg-slate-50">
            {/* Hero Section */}
            <section className="hero-section">
        <div className="hero-content">
        <h1>Transform Your Writing with AI</h1>
        <p className="hero-subtitle">Effortlessly upload and organize your contact lists, while AI generates and customizes tailored email templates. With automated delivery, your campaigns run smoothly and efficiently, saving you time and ensuring maximum outreach.</p>
        <div className="cta-buttons">
            <Link to="/signup" className="cta-primary">
                Get Started Free
                <ArrowRight className="inline ml-2 w-4 h-4" />
            </Link>
            <Link to="/email" className="cta-secondary">Make your Campaign</Link>
        </div>
    </div>
   
</section>


            {/* Features Section */}
            <section className="features-section">
                <h2>Features that Empower You</h2>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps-container">
                    {[
                       {
                        title: "AI-Generated Templates",
                        description: "Let AI create tailored email templates for your campaign needs, saving you time and effort."
                    },
                    {
                        title: "Customize with Ease",
                        description: "Refine and personalize your content effortlessly to match your campaign's tone and goals."
                    },
                    {
                        title: "Automated Delivery",
                        description: "Set up automation to send your emails seamlessly, ensuring timely and efficient outreach."
                    }
                    
                    ].map((step, index) => (
                        <div key={index} className="step">
                            <div className="step-number">{index + 1}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <h2>What Our Users Say</h2>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <p className="testimonial-text">"{testimonial.text}"</p>
                            <div className="testimonial-author">
                            
                                <strong>{testimonial.author}</strong>
                                <span>{testimonial.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="bottom-cta">
                <div className="bottom-cta-content">
                    <h2>Ready to Transform Your Writing?</h2>
                    <p>Join thousands of satisfied users who have improved their communication with Swift AI</p>
                    <Link to="/signup" className="cta-primary">
                        Start Free Trial
                        <ArrowRight className="inline ml-2 w-4 h-4" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Mainpage;