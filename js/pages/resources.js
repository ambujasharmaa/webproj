// Resources Page
function ResourcesPage() {
  const user = Storage.getUser();
  if (!user) { Router.navigate('/login'); return Loader(); }

  const container = createElement('div', 'page-wrapper');
  container.appendChild(Header());

  const body = createElement('div', 'page-body');

  // Page hero — title left, illustration right
  const pageHero = createElement('div', 'page-hero');

  const titleRow = createElement('div', 'page-title');
  titleRow.appendChild(createElement('span', '', 'Resources'));
  pageHero.appendChild(titleRow);

  const heroIllustration = createElement('img', 'page-hero__illustration', '', {
    src: '../public/singlePersonFlipped.svg',
    alt: 'Person illustration'
  });
  pageHero.appendChild(heroIllustration);

  body.appendChild(pageHero);

  const mockResources = [
    { id: '1', title: 'Coping With Anxiety', description: 'Simple breathing techniques and grounding exercises.', files: 10, category: 'Mental Health' },
    { id: '2', title: 'Understanding Depression', description: 'Learn signs of depression and small steps to feel better.', files: 4, category: 'Mental Health' },
    { id: '3', title: 'Stress Management', description: 'Practical routines and mindset shifts to reduce stress.', files: 10, category: 'Wellness' },
    { id: '4', title: 'Mindfulness & Meditation', description: 'Beginner-friendly guides to stay present and calm.', files: 64, category: 'Mindfulness' },
    { id: '5', title: 'Sleep & Rest Guide', description: 'Improve sleep quality with science-backed techniques.', files: 7, category: 'Wellness' },
    { id: '6', title: 'Building Resilience', description: 'Develop inner strength and bounce back from challenges.', files: 12, category: 'Growth' },
  ];

  const grid = createElement('div', 'resources-grid');

  mockResources.forEach(resource => {
    const card = createElement('div', 'resource-card');

    // Circular badge with file count
    const badge = createElement('div', 'resource-card__badge');
    const count = createElement('div', 'resource-card__badge-count', resource.files.toString());
    const label = createElement('div', 'resource-card__badge-label', 'Files');
    badge.appendChild(count);
    badge.appendChild(label);

    const title = createElement('div', 'resource-card__title', resource.title);
    const desc = createElement('p', 'resource-card__desc', resource.description);

    // Add (+) button in corner
    const addBtn = createElement('button', 'resource-add-btn', '+');
    addBtn.title = 'Add file';
    addBtn.onclick = (e) => {
      e.stopPropagation();
      showUploadModal(resource);
    };

    card.appendChild(addBtn);
    card.appendChild(badge);
    card.appendChild(title);
    card.appendChild(desc);

    card.onclick = () => API.showToast(`Opening: ${resource.title}`, 'info');
    grid.appendChild(card);
  });

  body.appendChild(grid);
  container.appendChild(body);
  return container;
}

function showUploadModal(resource) {
  const overlay = createElement('div', 'modal-overlay');
  const modal = createElement('div', 'modal upload-modal');

  const modalHeader = createElement('div', 'modal-header');
  const modalTitle = createElement('h2', 'modal-title', 'Upload File');
  const closeBtn = createElement('button', 'modal-close', '×');
  closeBtn.onclick = () => overlay.remove();
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeBtn);

  const modalBody = createElement('div', 'modal-body');

  const titleGroup = createElement('div', 'form-group');
  const titleLabel = createElement('label', 'form-label', `RESOURCE FILE TITLE* (0/50)`);
  const titleInput = createElement('input', 'form-input', '', { type: 'text', placeholder: '' });
  titleInput.oninput = () => { titleLabel.textContent = `RESOURCE FILE TITLE* (${titleInput.value.length}/50)`; };
  titleGroup.appendChild(titleLabel);
  titleGroup.appendChild(titleInput);

  const descGroup = createElement('div', 'form-group');
  const descLabel = createElement('label', 'form-label', `RESOURCE FILE DESCRIPTION (0/500)`);
  const descInput = createElement('textarea', 'form-textarea', '');
  descInput.style.minHeight = '80px';
  descInput.oninput = () => { descLabel.textContent = `RESOURCE FILE DESCRIPTION (${descInput.value.length}/500)`; };
  descGroup.appendChild(descLabel);
  descGroup.appendChild(descInput);

  const uploadBtn = createElement('button', 'btn btn-outline w-full mb-2', 'Upload a File');
  uploadBtn.style.justifyContent = 'center';
  uploadBtn.onclick = () => API.showToast('File upload coming soon', 'info');

  const orDivider = createElement('div', 'text-center text-gray-400', 'or');
  orDivider.style.padding = '0.4rem 0';
  orDivider.style.fontSize = '0.8rem';

  const linkInput = createElement('input', 'form-input', '', { type: 'url', placeholder: 'Enter link to the file' });

  const addBtn = createElement('button', 'btn btn-primary', 'Add');
  addBtn.style.cssText = 'margin-top: 1rem; margin-left: auto; display: flex;';
  addBtn.onclick = () => {
    API.showToast('File added!', 'success');
    overlay.remove();
  };

  modalBody.appendChild(titleGroup);
  modalBody.appendChild(descGroup);
  modalBody.appendChild(uploadBtn);
  modalBody.appendChild(orDivider);
  modalBody.appendChild(linkInput);
  modalBody.appendChild(addBtn);

  modal.appendChild(modalHeader);
  modal.appendChild(modalBody);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

Router.register('/resources', ResourcesPage);
