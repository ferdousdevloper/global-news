import queAns from '../../Images/queAns.png';

const faqData = [
    {
        question: "How do I bookmark news articles?",
        answer: "To bookmark an article, click the bookmark icon at the top of the news card. Access your bookmarks via your profile section.",
    },
    {
        question: "How do I share news on social media?",
        answer: "Click the share icon available on the article or news card. Share via Facebook, Twitter, or copy the link.",
    },
    {
        question: "How can I search for specific news categories?",
        answer: "To search for specific categories, use the search bar at the top of the homepage. You can filter results by category, keywords, or publication date.",
    },
    {
        question: "How do I customize my news feed?",
        answer: "To customize your news feed, go to the 'Settings' section in your profile and select your preferred categories. Your feed will then display news based on your choices.",
    },
    {
        question: "How can I report an issue or provide feedback?",
        answer: "If you encounter any issues or want to give feedback, use the 'Contact Us' form available in the footer of the website. We will get back to you promptly.",
    }

];

const Faq = () => {
    return (
        <div className="container mx-auto py-8 text-white" style={{ width: "85%" }}>
            <div className="mb-12 text-center ">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider">
                    Frequently Asked Questions
                </h2>
                <p className="mt-3 md:mt-6 lg:text-xl text-base-300 tracking-wider">Answers to the most common questions you might have</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 md:gap-8">
                {/* Banner Section */}
                <div className="bg-green-200 rounded-lg">
                    <img
                        src={queAns}
                        alt="queAns"
                        className='w-full p-4 h=[300px] md:h-[400px] object-cover rounded-3xl'
                    />
                </div>
                {/* Accordion section */}
                <div className="space-y-1 w-full ">
                    {
                        faqData.slice(0, 5).map((faq, index) => (
                            <div key={index} className="collapse collapse-arrow join-faq border-base-300 border">
                                <input type="radio" name="my-accordion-4" defaultChecked />
                                <div className="collapse-title text-xl font-medium">{faq.question}</div>
                                <div className="collapse-content">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Faq;




