document.addEventListener('DOMContentLoaded', function () {
    // --- Tab Functionality ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activate the clicked tab
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- Copy Button Functionality ---
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetTextarea = document.getElementById(targetId);
            const copiedMessage = button.nextElementSibling;

            // Select text and copy
            targetTextarea.select();
            targetTextarea.setSelectionRange(0, 99999); // For mobile devices
            try {
                // Use the modern clipboard API if available, with a fallback
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(targetTextarea.value);
                } else {
                    // Fallback for older browsers or insecure contexts
                    document.execCommand('copy');
                }
                
                // Show "Copied!" message
                copiedMessage.style.opacity = '1';
                setTimeout(() => {
                    copiedMessage.style.opacity = '0';
                }, 2000);

            } catch (err) {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy text. Please copy it manually.');
            }

            // Deselect text
            window.getSelection().removeAllRanges();
        });
    });

    // --- Print Button Functionality ---
    const printButton = document.getElementById('print-button');
    printButton.addEventListener('click', () => {
        window.print();
    });
});