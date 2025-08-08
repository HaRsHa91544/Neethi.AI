// Sample news data for demonstration
const newsHistory = [
    {
        id: 1,
        title: "Scientists Discover New Species of Deep-Sea Fish",
        sources: ["India Today", "NDTV"],
        isReal: true,
        confidence: 94,
        date: "2024-01-15",
        timestamp: "2:30 PM"
    },
    {
        id: 2,
        title: "Local Man Claims to Have Invented Time Travel Machine",
        sources: ["The Economic Times", "Livemint"],
        isReal: false,
        confidence: 87,
        date: "2024-01-14",
        timestamp: "11:45 AM"
    },
    {
        id: 3,
        title: "New Renewable Energy Technology Shows Promise",
        sources: ["The Hindu", "Indian Express"],
        isReal: true,
        confidence: 91,
        date: "2024-01-13",
        timestamp: "9:15 AM"
    },
    {
        id: 4,
        title: "Aliens Land in Central Park, Demand Pizza",
        sources: ["The Times of India", "Hindustan Times"],
        isReal: false,
        confidence: 96,
        date: "2024-01-12",
        timestamp: "6:20 PM"
    },
    {
        id: 5,
        title: "Global Climate Summit Reaches Historic Agreement",
        sources: ["The Guardian", "BBC News"],
        isReal: true,
        confidence: 89,
        date: "2024-01-11",
        timestamp: "4:45 PM"
    },
    {
        id: 6,
        title: "Smartphone App Claims to Read Minds",
        sources: ["The Verge", "TechCrunch"], isReal: false,
        confidence: 92,
        date: "2024-01-10",
        timestamp: "1:30 PM"
    }
];

// Function to create a news card element
function createNewsCard(news) {
    const card = document.createElement('div');
    card.className = 'news-card';

    const tagClass = news.isReal ? 'real' : 'fake';
    const tagText = news.isReal ? 'Real News' : 'Fake News';

    card.innerHTML = `
        <div class="news-card-header">
            <span class="news-tag ${tagClass}">${tagText}</span>
            <span class="news-date">${news.date} • ${news.timestamp}</span>
        </div>
        <div class="news-content">
            <h3 class="news-title">${news.title}</h3>
            <div class="news-sources">
                ${news.sources.map(source => `<span class="news-source-item">${source}</span>`).join('')}
            </div>
        </div>
        <div class="news-footer">
            <div class="confidence-score">
                <span class="confidence-label">Confidence:</span>
                <span class="confidence-value">${news.confidence}%</span>
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
function renderNewsHistory() {
    const container = document.querySelector('.container');

    if (newsHistory.length === 0) {
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



