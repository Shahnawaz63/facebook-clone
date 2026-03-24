document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SIDEBAR "SEE MORE" LOGIC ---
    const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
    const hiddenItems = document.querySelectorAll('.hidden-sidebar-item');
    const toggleText = toggleSidebarBtn.querySelector('.toggle-text');
    const toggleIcon = toggleSidebarBtn.querySelector('.toggle-icon');
    let isSidebarExpanded = false;

    toggleSidebarBtn.addEventListener('click', () => {
        isSidebarExpanded = !isSidebarExpanded;
        
        hiddenItems.forEach(item => {
            item.style.display = isSidebarExpanded ? 'flex' : 'none';
        });

        if (isSidebarExpanded) {
            toggleText.textContent = 'See less';
            toggleIcon.classList.remove('fa-chevron-down');
            toggleIcon.classList.add('fa-chevron-up');
        } else {
            toggleText.textContent = 'See more';
            toggleIcon.classList.remove('fa-chevron-up');
            toggleIcon.classList.add('fa-chevron-down');
        }
    });

    // --- 2. DROPDOWN PANELS LOGIC ---
    const dropdownBtns = [
        { btn: document.getElementById('menu-btn'), panel: document.getElementById('menu-panel') },
        { btn: document.getElementById('messenger-btn'), panel: document.getElementById('messenger-panel') },
        { btn: document.getElementById('notif-btn'), panel: document.getElementById('notif-panel') },
        { btn: document.getElementById('profile-btn'), panel: document.getElementById('profile-panel') }
    ];

    // Function to close all panels
    function closeAllPanels() {
        dropdownBtns.forEach(item => item.panel.classList.remove('show'));
    }

    // Attach click events to each button
    dropdownBtns.forEach(item => {
        item.btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the click from bubbling to the window
            const isCurrentlyOpen = item.panel.classList.contains('show');
            closeAllPanels(); // Close everything first
            if (!isCurrentlyOpen) {
                item.panel.classList.add('show'); // Open this one if it wasn't already open
            }
        });

        // Prevent clicking inside the panel from closing it
        item.panel.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Clicking anywhere else on the screen closes the panels
    window.addEventListener('click', () => {
        closeAllPanels();
    });

    // --- 3. CHAT POPUP LOGIC ---
    const chatPopup = document.getElementById('chat-popup');
    const newChatBtn = document.getElementById('new-chat-btn'); // Button inside messenger panel
    const closeChatBtn = document.getElementById('close-chat');

    newChatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        chatPopup.classList.add('show');
        closeAllPanels(); // Optionally close menus when chat opens
    });

    closeChatBtn.addEventListener('click', () => {
        chatPopup.classList.remove('show');
    });
});



// --- 4. INFINITE SCROLL FEED LOGIC ---
    const postFeed = document.querySelector('.post-feed');

    // Array of names to make the dynamic feed feel alive
    const randomNames = ["Kahan Mody", "Tech Insider", "Abdul Miyana", "Daily Quotes", "Quick Furniture"];

    // This function builds a brand new post from scratch
    function createNewPost() {
        // Pick a random name from the array
        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
        // Generate a random number to get a unique image from Picsum
        const randomImageId = Math.floor(Math.random() * 1000); 

        // 1. Create the container div
        const newPost = document.createElement('div');
        newPost.classList.add('post-card');

        // 2. Add the inner HTML (Notice the image is set to 590x350 to stay under 400px height)
        newPost.innerHTML = `
            <div class="post-header">
                <div class="post-user-info">
                    <img src="https://placehold.co/40x40/1877f2/ffffff?text=${randomName.charAt(0)}" alt="Profile" class="profile-pic">
                    <div>
                        <h3>${randomName}</h3>
                        <span>Just now · <i class="fa-solid fa-earth-americas"></i></span>
                    </div>
                </div>
                <div class="post-options">
                    <i class="fa-solid fa-ellipsis"></i>
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div class="post-text">
                <p>This post was dynamically loaded! The infinite scroll is working perfectly. 🚀</p>
            </div>
            <img src="https://picsum.photos/seed/${randomImageId}/590/350" alt="Post Image" class="post-image">
            
            <div class="divider"></div>
            <div class="post-actions">
                <div class="action-btn"><i class="fa-regular fa-thumbs-up"></i><span>Like</span></div>
                <div class="action-btn"><i class="fa-regular fa-message"></i><span>Comment</span></div>
                <div class="action-btn"><i class="fa-solid fa-share"></i><span>Share</span></div>
            </div>
        `;
        
        // 3. Attach the new post to the bottom of the feed
        postFeed.appendChild(newPost);
    }

    // Load a few posts immediately when the page first opens
    for(let i = 0; i < 3; i++) {
        createNewPost();
    }

    // The actual scroll listener
    window.addEventListener('scroll', () => {
        // window.innerHeight = Height of the visible screen
        // window.scrollY = How far down we have scrolled
        const currentScrollPosition = window.innerHeight + window.scrollY;
        
        // document.body.offsetHeight = The total height of the entire webpage
        const totalPageHeight = document.body.offsetHeight;

        // If our current position is within 100 pixels of the absolute bottom, load 2 more posts!
        if (currentScrollPosition >= totalPageHeight - 100) {
            createNewPost();
            createNewPost(); 
        }
    });