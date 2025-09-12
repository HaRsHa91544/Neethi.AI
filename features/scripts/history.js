// Function to create a news card element
function createNewsCard(news) {
    const card = document.createElement('div');
    card.className = 'news-card';

    const tagClass = news.verdict == 'Real' ? 'real' : 'fake';
    const tagText = news.verdict == 'Real' ? 'Real News' : 'Fake News';
    const sources = news.sources.split(',');
    let [date, time] = news.time.split('T');
    time = time.substr(0, 5);
    let [hour, minute] = time.split(":");
    let date12 = new Date();
    date12.setHours(hour, minute);

    let time12 = date12.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
    });

    card.innerHTML = `
        <div class="news-card-header">
            <span class="news-tag ${tagClass}">${tagText}</span>
            <span class="news-date">${date.split('-').reverse().join('-')} • ${time12}</span>
        </div>
        <div class="news-content">
            <h3 class="news-title">${news.news}</h3>
            <div class="news-sources">
                ${sources.map(source => `<span class="news-source-item">${source}</span>`).join('')}
            </div>
        </div>
        <div class="news-footer">
            <div class="confidence-score">
                <span class="confidence-label">Confidence:</span>
                <span class="confidence-value">${Math.round(Number(news.score))}%</span>
            </div>
            <div class="news-actions">
                <button class="action-btn share" onclick="shareNews(${news.id})" title="Share">
                    <i class="fas fa-share-alt"></i>
                </button>
                <button class="action-btn delete" onclick="deleteNews(${news.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;

    return card;
}

// Function to create empty state
function createEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';

    emptyState.innerHTML = `
        <div class="empty-state-icon">
            <i class="fas fa-history"></i>
        </div>
        <h2 class="empty-state-title">No History Found</h2>
        <p class="empty-state-description">You haven't analyzed any news yet. Start by checking some news for authenticity.</p>
        <a href="fake-news-detector.html" class="empty-state-action">Detect Fake News</a>
    `;

    return emptyState;
}

// Function to render news history
async function renderNewsHistory() {
    const token = localStorage.getItem('neethiToken');
    const request = await fetch('http://localhost:3000/history', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ token })
    });
    const response = await request.json();
    const newsHistory = response.rows;
    console.log(newsHistory);

    const container = document.querySelector('.container');
    if (!response.sucesss) {
        container.appendChild(createEmptyState());
    } else {
        newsHistory.forEach(news => {
            container.appendChild(createNewsCard(news));
        });
    }
}

// Function to share news
function shareNews(newsId) {
    const news = newsHistory.find(n => n.id === newsId);
    if (news) {
        if (navigator.share) {
            navigator.share({
                title: news.title,
                text: `Sources: ${news.sources.join(", ")}`,

                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const shareText = `${news.title}\n\nSources: ${news.sources.join(", ")}\n\nAnalyzed by Neethi.AI`;
            navigator.clipboard.writeText(shareText).then(() => {
                alert('News copied to clipboard!');
            }).catch(() => {
                alert('Unable to share. Please copy the text manually.');
            });
        }
    }
}

// Function to delete news
function deleteNews(newsId) {
    if (confirm('Are you sure you want to delete this news from your history?')) {
        const index = newsHistory.findIndex(n => n.id === newsId);
        if (index !== -1) {
            newsHistory.splice(index, 1);

            // Re-render the history
            const container = document.querySelector('.container');
            container.innerHTML = '';
            renderNewsHistory();
        }
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    renderNewsHistory();
});



