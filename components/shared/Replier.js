import { useState } from 'react';

import styles from 'styles/Replier.module.css';

const Replier = ({ isOpen, hasTitle = true, onClose, onSubmit, replyTo }) => {
  const [reply, setReply] = useState({ title: '', content: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReply({ ...reply, [name]: value });
  };

  const resetReply = () => {
    setReply({ title: '', content: '' });
  };

  const handleSubmit = () => {
    if (
      (hasTitle && reply.title && reply.content) ||
      (!hasTitle && reply.content)
    ) {
      onSubmit(reply, resetReply);
    }
  };

  return (
    <div className={`reply-controls ${isOpen ? 'is-open' : ''}`}>
      <div className="reply-area">
        {replyTo && (
          <div className="reply-to">
            Reply To:<span className="text ms-2">{replyTo}</span>
          </div>
        )}
        {hasTitle && (
          <div className="fj-editor-input">
            <input
              name="title"
              placeholder="Topic title"
              value={reply.title}
              type="text"
              onChange={handleChange}
            />
          </div>
        )}

        <div className="fj-editor">
          <div className="fj-editor-textarea-wrapper">
            <textarea
              name="content"
              placeholder="Type here"
              value={reply.content}
              onChange={handleChange}
            />
          </div>
          <div className="fj-editor-preview-wrapper">
            <div className="preview">
              <p />
            </div>
          </div>
        </div>
        <div className="submit-area">
          <div className="send mr-auto">
            <button
              className="btn btn-main bg-blue py-2 ttu"
              type="button"
              onClick={handleSubmit}
            >
              Reply
            </button>
            <a className={styles.btn} onClick={onClose} role="button" href="#">
              Cancel
            </a>
          </div>
          {/* <div>
            <a className={styles.btn} role="button" href="#">
              Hide preview
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Replier;
