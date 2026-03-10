// Journal Page
function JournalPage() {
  const user = Storage.getUser();

  if (!user) {
    Router.navigate('/login');
    return Loader();
  }

  const container = createElement('div', 'page-wrapper');

  // Header
  container.appendChild(Header());

  // Main Content (centered, stacked) — use a div instead of <main> to avoid global `main { display:flex }` conflict
  const main = createElement('div', 'page-body');
  main.style.display = 'block';
  main.style.maxWidth = '700px';
  main.style.margin = '0 auto';
  main.style.padding = '2rem';
  main.style.paddingTop = '3rem';

  // Title row (uses global .page-title so spacing stays consistent)
  const titleRow = createElement('div', 'page-title');
  const titleText = createElement('span', '', '📖 My Journal');
  const actions = createElement('div', 'page-title-actions');
  const newEntryBtn = PrimaryButton('✏️ New Entry', () => showJournalModal());
  newEntryBtn.classList.add('btn-small');
  actions.appendChild(newEntryBtn);
  titleRow.appendChild(titleText);
  titleRow.appendChild(actions);
  main.appendChild(titleRow);

  // Month selector (simple left-aligned row under title)
  const monthSelector = createElement('div', 'month-selector');
  monthSelector.style.display = 'flex';
  monthSelector.style.gap = '0.5rem';
  monthSelector.style.marginTop = '0.25rem';
  monthSelector.style.marginBottom = '1rem';
  monthSelector.style.flexWrap = 'wrap';

  const months = ['January', 'February', 'March', 'April', 'May', 'June'];
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  let selectedMonth = currentMonth;

  months.forEach(month => {
    const isActive = month === selectedMonth;
    const pill = createElement('button', `month-pill ${isActive ? 'active' : ''}`, month);
    pill.style.padding = '0.32rem 0.9rem';
    pill.style.borderRadius = '999px';
    pill.style.minWidth = '70px';
    pill.style.height = '34px';
    pill.style.border = isActive ? 'none' : '1px solid var(--border)';
    pill.style.background = isActive ? 'var(--primary)' : 'var(--bg-light)';
    pill.style.color = isActive ? '#fff' : 'var(--text-primary)';
    pill.style.cursor = 'pointer';
    pill.onclick = () => {
      selectedMonth = month;
      Array.from(monthSelector.children).forEach(c => {
        c.classList.remove('active');
        c.style.background = 'var(--bg-light)';
        c.style.color = 'var(--text-primary)';
        c.style.border = '1px solid var(--border)';
      });
      pill.classList.add('active');
      pill.style.background = 'var(--primary)';
      pill.style.color = '#fff';
      pill.style.border = 'none';
      API.showToast(`Showing entries from ${month}`, 'info');
    };
    monthSelector.appendChild(pill);
  });

  main.appendChild(monthSelector);

  // Mood → CSS class + dot color mapping
  const moodMap = {
    '😊': 'mood-happy',
    '😍': 'mood-happy',
    '😌': 'mood-calm',
    '😴': 'mood-calm',
    '😔': 'mood-sad',
    '😢': 'mood-sad',
    '😤': 'mood-angry',
    '😠': 'mood-angry',
  };

  const mockEntries = [
    {
      id: 1,
      date: new Date(Date.now() - 86400000),
      mood: '😊',
      title: 'A Good Day',
      content: 'Today was wonderful. I had a productive session at work, spent time with friends, and took a long walk in the park. Feeling grateful and at peace.',
      tags: ['gratitude', 'productivity']
    },
    {
      id: 2,
      date: new Date(Date.now() - 172800000),
      mood: '😔',
      title: 'Challenging Times',
      content: 'Today was difficult. I faced some setbacks but realized that challenges are opportunities to grow. Going to meditate and practice self-compassion.',
      tags: ['reflection', 'growth']
    },
    {
      id: 3,
      date: new Date(Date.now() - 259200000),
      mood: '😌',
      title: 'Mindfulness Practice',
      content: 'Started my day with meditation. It helped me stay focused and calm throughout the day. I should make this a daily habit.',
      tags: ['mindfulness', 'habit']
    },
    {
      id: 4,
      date: new Date(Date.now() - 345600000),
      mood: '😍',
      title: 'Small Wins',
      content: 'Achieved something I\'ve been working towards. It\'s not big, but it means a lot to me. Every step counts.',
      tags: ['achievement', 'self-care']
    }
  ];

  // Timeline wrapper
  const timeline = createElement('div', 'journal-timeline');

  mockEntries.forEach(entry => {
    const moodClass = moodMap[entry.mood] || 'mood-calm';
    const entryWrapper = createElement('div', `journal-entry ${moodClass}`);

    const card = createElement('div', 'journal-card');

    // Date
    const dateEl = createElement('div', 'journal-date',
      entry.date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    );

    // Title
    const titleEl = createElement('div', 'journal-title', entry.title);

    // Content (collapsed by default)
    const textEl = createElement('div', 'journal-text collapsed', entry.content);

    // Expand button
    const expandBtn = createElement('button', 'expand-btn', 'Read more');
    expandBtn.onclick = () => {
      textEl.classList.toggle('collapsed');
      expandBtn.textContent = textEl.classList.contains('collapsed') ? 'Read more' : 'Show less';
    };

    // Tags
    const tagsEl = createElement('div', 'journal-tags');
    entry.tags.forEach(tag => {
      const tagEl = createElement('span', 'journal-tag', tag);
      tagsEl.appendChild(tagEl);
    });

    // Actions
    const actionsEl = createElement('div', 'journal-actions');
    const editBtn = createElement('button', '', '✏️ Edit');
    editBtn.onclick = () => showJournalModal(entry);
    const deleteBtn = createElement('button', '', '🗑️ Delete');
    deleteBtn.onclick = () => {
      if (confirm('Delete this entry?')) {
        API.showToast('Entry deleted', 'success');
        entryWrapper.remove();
      }
    };
    actionsEl.appendChild(editBtn);
    actionsEl.appendChild(deleteBtn);

    card.appendChild(dateEl);
    card.appendChild(titleEl);
    card.appendChild(textEl);
    card.appendChild(expandBtn);
    card.appendChild(tagsEl);
    card.appendChild(actionsEl);

    entryWrapper.appendChild(card);
    timeline.appendChild(entryWrapper);
  });

  main.appendChild(timeline);

  container.appendChild(main);
  return container;
}

function showJournalModal(entry = null) {
  const modal = createElement('div', 'modal');

  const content = createElement('div', 'modal-content');
  content.style.maxWidth = '600px';

  const header = createElement('div', 'modal-header');
  header.innerHTML = `<h2 style="margin: 0;">${entry ? 'Edit Entry' : 'New Journal Entry'}</h2>`;

  const closeBtn = createElement('button', 'modal-close', '×');
  closeBtn.onclick = () => modal.remove();
  header.appendChild(closeBtn);

  // Date input
  const dateGroup = FormInput('Date', 'date', '', 'entry-date');
  dateGroup.input.value = entry ? entry.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

  // Mood selector
  const moodGroup = createElement('div', 'form-group');
  const moodLabel = createElement('label', 'form-label', 'How are you feeling?');
  const moodOptions = createElement('div', 'flex gap-4 mt-2');
  const moods = ['😊', '😌', '😔', '😍', '😴', '😤'];
  let selectedMood = entry?.mood || '😌';

  moods.forEach(mood => {
    const moodBtn = createElement('button', 'text-2xl cursor-pointer', mood);
    moodBtn.type = 'button';
    moodBtn.style.padding = '0.5rem';
    moodBtn.style.border = selectedMood === mood ? '2px solid #667eea' : 'none';
    moodBtn.style.borderRadius = '0.5rem';
    moodBtn.style.transition = 'all 0.2s ease';
    
    moodBtn.onmouseover = () => {
      moodBtn.style.transform = 'scale(1.15)';
    };
    moodBtn.onmouseout = () => {
      moodBtn.style.transform = 'scale(1)';
    };
    
    moodBtn.onclick = (e) => {
      e.preventDefault();
      selectedMood = mood;
      // Update all buttons
      Array.from(moodOptions.querySelectorAll('button')).forEach(btn => {
        btn.style.border = btn.textContent === mood ? '2px solid #667eea' : 'none';
      });
    };
    
    moodOptions.appendChild(moodBtn);
  });

  moodGroup.appendChild(moodLabel);
  moodGroup.appendChild(moodOptions);

  // Title
  const titleField = FormInput('Title', 'text', 'Give your entry a title', 'entry-title');
  titleField.input.value = entry?.title || '';

  // Content
  const contentGroup = createElement('div', 'form-group');
  const contentLabel = createElement('label', 'form-label', 'What\'s on your mind?');
  contentGroup.appendChild(contentLabel);
  const textarea = createElement('textarea', 'form-input w-full mb-4', entry?.content || '', {
    'placeholder': 'Write freely. This is your safe space...',
    'rows': '8'
  });
  contentGroup.appendChild(textarea);

  // Tags
  const tagsGroup = FormInput('Tags (comma separated)', 'text', 'e.g., gratitude, growth, mindfulness', 'entry-tags');
  tagsGroup.input.value = entry?.tags ? entry.tags.join(', ') : '';

  // Save button
  const saveBtn = PrimaryButton('💾 Save Entry', () => {
    const title = titleField.input.value.trim();
    const contentText = textarea.value.trim();

    if (!title || !contentText) {
      API.showToast('Please fill in title and content', 'error');
      return;
    }

    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';

    setTimeout(() => {
      API.showToast('Entry saved successfully!', 'success');
      modal.remove();
    }, 500);
  });

  content.appendChild(header);
  content.appendChild(dateGroup.container);
  content.appendChild(moodGroup);
  content.appendChild(titleField.container);
  content.appendChild(contentGroup);
  content.appendChild(tagsGroup.container);
  content.appendChild(saveBtn);

  modal.appendChild(content);
  document.body.appendChild(modal);

  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  textarea.focus();
}

// Register the page
Router.register('/journal', JournalPage);
