import { useState } from 'react';

const AdminImageModal = ({ item, onClose, onSave }) => {
  const [images, setImages] = useState(item.images || []); // Multiple images
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const fileURLs = selectedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...fileURLs]);
  };

  const handleUrlAdd = (url) => {
    if (url.trim()) {
      setImages(prev => [...prev, { file: null, preview: url }]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // In a real app, you would upload all images to server here
      const imageData = {
        ...item,
        images: images.map(img => img.preview) // store URLs or uploaded paths
      };
      onSave(imageData);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Edit {item.title}</h2>

        <form onSubmit={handleSubmit}>
          {/* File upload */}
          <div style={styles.inputGroup}>
            <label>
              Upload Images:
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                style={{ display: 'block', marginTop: '0.5rem' }}
              />
            </label>
          </div>

          {/* Add URL */}
          <div style={styles.inputGroup}>
            <label>
              Add Image URL:
              <input
                type="text"
                placeholder="Paste image URL"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleUrlAdd(e.target.value);
                    e.target.value = '';
                  }
                }}
                style={styles.textInput}
              />
            </label>
          </div>

          {/* Image previews */}
          {images.length > 0 && (
            <div style={styles.previewGrid}>
              {images.map((img, index) => (
                <div key={index} style={styles.previewItem}>
                  <img
                    src={img.preview}
                    alt={`Preview ${index}`}
                    style={styles.previewImage}
                  />
                  <button
                    type="button"
                    style={styles.removeBtn}
                    onClick={() => handleRemoveImage(index)}
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Buttons */}
          <div style={styles.btnRow}>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>
              Cancel
            </button>
            <button type="submit" disabled={isUploading} style={styles.saveBtn}>
              {isUploading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminImageModal;

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 1000
  },
  modal: {
    backgroundColor: 'white', padding: '2rem', borderRadius: '8px',
    width: '80%', maxWidth: '500px'
  },
  inputGroup: { marginBottom: '1rem' },
  textInput: {
    display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.5rem'
  },
  previewGrid: {
    display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem'
  },
  previewItem: { position: 'relative', width: '80px', height: '80px' },
  previewImage: {
    width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px'
  },
  removeBtn: {
    position: 'absolute', top: '-5px', right: '-5px', background: 'red',
    color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer',
    width: '20px', height: '20px'
  },
  btnRow: { display: 'flex', justifyContent: 'flex-end', gap: '1rem' },
  cancelBtn: {
    padding: '8px 16px', backgroundColor: '#ccc', border: 'none',
    borderRadius: '4px', cursor: 'pointer'
  },
  saveBtn: {
    padding: '8px 16px', backgroundColor: '#ff3f6c', color: 'white',
    border: 'none', borderRadius: '4px', cursor: 'pointer'
  }
};
