import React, { useState } from "react";
import axios from "axios";

export default function ContactMe() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        msg: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const response = await axios.post('/api/contact', formData);

            setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
            setFormData({ name: '', email: '', msg: '' });
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Failed to send message. Please try again.';
            setStatus({ type: 'error', message: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

return (
    <>
        <div className="w-full max-w-6xl mx-auto flex flex-col text-white justify-center items-center my-16 md:gap-12 gap-10 px-6 md:px-10 animate-slide-fade-in">
            {/* Header Section */}
            <div className="text-center space-y-3">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Get in Touch
                </h1>
                <p className="text-slate-400 text-lg">
                    Feel free to reach out for collaborations or just a friendly hello 👋
                </p>
            </div>

            {/* Main Content Container */}
            <div className="flex flex-col md:flex-row justify-center w-full gap-6 md:gap-8">
                {/* Contact Details Card */}
                <div className="contactDetails md:w-[45%] w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-black/20 p-8 space-y-6 hover:bg-white/10 transition-all duration-300">
                    <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
                        Contact Information
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="text-blue-400 text-2xl flex-shrink-0">📧</div>
                            <div className="min-w-0 flex-1">
                                <p className="text-slate-400 text-sm">Email</p>
                                <a 
                                    href="mailto:amankhan9034820992@gmail.com" 
                                    className="text-white hover:text-blue-400 transition-colors break-all text-sm md:text-base"
                                >
                                    amankhan9034820992@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="text-blue-400 text-2xl">💼</div>
                            <div>
                                <p className="text-slate-400 text-sm">LinkedIn</p>
                                <a 
                                    href="https://linkedin.com/in/aman7902k" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-blue-400 transition-colors"
                                >
                                    linkedin.com/in/aman7902k
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="text-blue-400 text-2xl">🐙</div>
                            <div>
                                <p className="text-slate-400 text-sm">GitHub</p>
                                <a 
                                    href="https://github.com/Aman7902K" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-blue-400 transition-colors"
                                >
                                    github.com/Aman7902K
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Send Message Card */}
                <div className="sendMessage md:w-[55%] w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg shadow-black/20 p-8">
                    <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
                        Send a Message
                    </h2>

                    {/* Status Message */}
                    {status.message && (
                        <div className={`p-4 rounded-lg mb-4 ${
                            status.type === 'success' 
                                ? 'bg-green-500/20 border border-green-400/30 text-green-400' 
                                : 'bg-red-500/20 border border-red-400/30 text-red-400'
                        }`}>
                            {status.message}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-slate-300 mb-2 text-sm font-medium">Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 mb-2 text-sm font-medium">Email</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your.email@example.com"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 mb-2 text-sm font-medium">Message</label>
                            <textarea 
                                name="msg"
                                value={formData.msg}
                                onChange={handleChange}
                                placeholder="Your message..."
                                rows="5"
                                required
                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all resize-none"
                            ></textarea>
                        </div>

                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 rounded-lg bg-blue-500/20 border border-blue-400/30 text-blue-400 font-semibold hover:bg-blue-500/30 hover:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
);
}
