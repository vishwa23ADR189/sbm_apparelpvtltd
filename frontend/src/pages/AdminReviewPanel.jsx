

import React, { useEffect, useState } from 'react';

const AdminReviewPanel = () => {
  const [allFAQs, setAllFAQs] = useState([]);
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const faqs = [];
    const reviews = [];

    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('faqs_')) {
        const productId = key.split('_')[1];
        const items = JSON.parse(localStorage.getItem(key) || '[]');
        items.forEach(item => faqs.push({ ...item, productId }));
      }

      if (key.startsWith('reviews_')) {
        const productId = key.split('_')[1];
        const items = JSON.parse(localStorage.getItem(key) || '[]');
        items.forEach(item => reviews.push({ ...item, productId }));
      }
    });

    setAllFAQs(faqs);
    setAllReviews(reviews);
  }, []);

  const updateLocalStorage = (key, updatedArray) => {
    localStorage.setItem(key, JSON.stringify(updatedArray));
  };

  const handleApproveFAQ = (faqId, productId) => {
    const key = `faqs_${productId}`;
    const updated = JSON.parse(localStorage.getItem(key)).map(f => f.id === faqId ? { ...f, approved: true } : f);
    updateLocalStorage(key, updated);
    setAllFAQs(prev => prev.map(f => f.id === faqId ? { ...f, approved: true } : f));
  };

  const handleDeleteFAQ = (faqId, productId) => {
    const key = `faqs_${productId}`;
    const updated = JSON.parse(localStorage.getItem(key)).filter(f => f.id !== faqId);
    updateLocalStorage(key, updated);
    setAllFAQs(prev => prev.filter(f => f.id !== faqId));
  };

  const handleApproveReview = (reviewId, productId) => {
    const key = `reviews_${productId}`;
    const updated = JSON.parse(localStorage.getItem(key)).map(r => r.id === reviewId ? { ...r, approved: true } : r);
    updateLocalStorage(key, updated);
    setAllReviews(prev => prev.map(r => r.id === reviewId ? { ...r, approved: true } : r));
  };

  const handleDeleteReview = (reviewId, productId) => {
    const key = `reviews_${productId}`;
    const updated = JSON.parse(localStorage.getItem(key)).filter(r => r.id !== reviewId);
    updateLocalStorage(key, updated);
    setAllReviews(prev => prev.filter(r => r.id !== reviewId));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛠️ Admin Review & FAQ Panel</h2>

      <h3 style={{ marginTop: '2rem' }}>📌 FAQs</h3>
      {allFAQs.length === 0 ? <p>No FAQs submitted yet.</p> :
        allFAQs.map(faq => (
          <div key={faq.id} style={itemStyle}>
            <p><strong>{faq.user}</strong> (Product #{faq.productId}): {faq.question}</p>
            <div>
              {!faq.approved && <button onClick={() => handleApproveFAQ(faq.id, faq.productId)}>✅ Approve</button>}
              <button onClick={() => handleDeleteFAQ(faq.id, faq.productId)}>🗑️ Delete</button>
            </div>
          </div>
        ))
      }

      <h3 style={{ marginTop: '2rem' }}>⭐ Reviews</h3>
      {allReviews.length === 0 ? <p>No reviews submitted yet.</p> :
        allReviews.map(review => (
          <div key={review.id} style={itemStyle}>
            <p><strong>{review.user}</strong> (Product #{review.productId}): {review.text}</p>
            <div>
              {!review.approved && <button onClick={() => handleApproveReview(review.id, review.productId)}>✅ Approve</button>}
              <button onClick={() => handleDeleteReview(review.id, review.productId)}>🗑️ Delete</button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

const itemStyle = {
  background: '#f4f4f4',
  padding: '1rem',
  borderRadius: '6px',
  marginBottom: '1rem'
};

export default AdminReviewPanel;
