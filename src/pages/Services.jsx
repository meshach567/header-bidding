import React from 'react';

const Services = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Our Services</h1>
            <p className="mb-2">We offer a variety of services to help you achieve your publishing goals:</p>
            <ul className="list-disc list-inside">
                <li className="mb-1">Content Creation</li>
                <li className="mb-1">Editing and Proofreading</li>
                <li className="mb-1">Publishing Consultation</li>
                <li className="mb-1">Marketing and Promotion</li>
                <li className="mb-1">Ad Revenue Optimization</li>
            </ul>
            <p className="mt-4">Contact us to learn more about how we can assist you!</p>
        </div>
    );
};

export default Services;