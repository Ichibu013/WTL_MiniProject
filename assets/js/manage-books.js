import { BOOK_URL } from "./url.js";

const manageBooksModule = {
    books: [],

    async init() {
        console.log("Initializing manage books module...");
        try {
            this.books = await this.fetchBooks();
            this.displayBooks();
            this.setupEventListeners();
            console.log("Manage books module initialization completed");
        } catch (error) {
            console.error("Error during initialization:", error);
            this.showError("Failed to load books. Please try again later.");
        }
    },

    async fetchBooks() {
        try {
            console.log('Attempting to fetch books from:', BOOK_URL);
            const response = await fetch(BOOK_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const books = await response.json();
            console.log('Fetched books:', books);
            return books;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    },

    setupEventListeners() {
        // Add Book Form
        const addBookForm = document.getElementById('addBookForm');
        if (addBookForm) {
            addBookForm.addEventListener('submit', (e) => this.handleAddBook(e));
        }
    },

    async handleAddBook(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const bookData = {
            id: Date.now().toString(), // Generate a unique ID
            title: formData.get('title'),
            author: formData.get('author'),
            price: parseFloat(formData.get('price')),
            category: formData.get('category'),
            language: formData.get('language'),
            imageUrl: formData.get('imageUrl'),
            description: formData.get('description'),
            isbn: formData.get('isbn'),
            publishDate: formData.get('publishDate'),
            publisher: formData.get('publisher'),
            pageCount: parseInt(formData.get('pageCount')),
            rating: parseFloat(formData.get('rating')),
            reviews: parseInt(formData.get('reviews'))
        };

        try {
            // In a real application, you would send this to your backend
            // For now, we'll just add it to the local array
            this.books.push(bookData);
            this.displayBooks();
            this.showSuccess("Book added successfully!");
            event.target.reset();
        } catch (error) {
            console.error('Error adding book:', error);
            this.showError("Failed to add book. Please try again.");
        }
    },

    async handleDeleteBook(bookId) {
        try {
            // In a real application, you would send this to your backend
            // For now, we'll just remove it from the local array
            this.books = this.books.filter(book => book.id !== bookId);
            this.displayBooks();
            this.showSuccess("Book deleted successfully!");
        } catch (error) {
            console.error('Error deleting book:', error);
            this.showError("Failed to delete book. Please try again.");
        }
    },

    async handleUpdateBook(bookId, updatedData) {
        try {
            // In a real application, you would send this to your backend
            // For now, we'll just update the local array
            const index = this.books.findIndex(book => book.id === bookId);
            if (index !== -1) {
                this.books[index] = { ...this.books[index], ...updatedData };
                this.displayBooks();
                this.showSuccess("Book updated successfully!");
            }
        } catch (error) {
            console.error('Error updating book:', error);
            this.showError("Failed to update book. Please try again.");
        }
    },

    displayBooks() {
        const tbody = document.getElementById('booksTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>$${book.price.toFixed(2)}</td>
                <td>${book.category}</td>
                <td>
                    <button class="btn btn-sm btn-primary edit-btn" data-book-id="${book.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger delete-btn" data-book-id="${book.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;

            // Add event listeners for edit and delete buttons
            const editBtn = row.querySelector('.edit-btn');
            const deleteBtn = row.querySelector('.delete-btn');

            editBtn.addEventListener('click', () => this.openEditModal(book));
            deleteBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this book?')) {
                    this.handleDeleteBook(book.id);
                }
            });

            tbody.appendChild(row);
        });
    },

    openEditModal(book) {
        // Create and show a modal for editing
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = 'editBookModal';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Book</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editBookForm">
                            <input type="hidden" name="id" value="${book.id}">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="edit-title" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="edit-title" name="title" value="${book.title}" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="edit-author" class="form-label">Author</label>
                                    <input type="text" class="form-control" id="edit-author" name="author" value="${book.author}" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="edit-price" class="form-label">Price</label>
                                    <input type="number" class="form-control" id="edit-price" name="price" value="${book.price}" step="0.01" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="edit-category" class="form-label">Category</label>
                                    <input type="text" class="form-control" id="edit-category" name="category" value="${book.category}" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="edit-language" class="form-label">Language</label>
                                    <input type="text" class="form-control" id="edit-language" name="language" value="${book.language}" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="edit-imageUrl" class="form-label">Image URL</label>
                                    <input type="url" class="form-control" id="edit-imageUrl" name="imageUrl" value="${book.imageUrl}" required>
                                </div>
                                <div class="col-12 mb-3">
                                    <label for="edit-description" class="form-label">Description</label>
                                    <textarea class="form-control" id="edit-description" name="description" rows="3" required>${book.description}</textarea>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="edit-isbn" class="form-label">ISBN</label>
                                    <input type="text" class="form-control" id="edit-isbn" name="isbn" value="${book.isbn}" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="edit-publishDate" class="form-label">Publish Date</label>
                                    <input type="date" class="form-control" id="edit-publishDate" name="publishDate" value="${book.publishDate}" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="edit-publisher" class="form-label">Publisher</label>
                                    <input type="text" class="form-control" id="edit-publisher" name="publisher" value="${book.publisher}" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="edit-pageCount" class="form-label">Page Count</label>
                                    <input type="number" class="form-control" id="edit-pageCount" name="pageCount" value="${book.pageCount}" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="edit-rating" class="form-label">Rating</label>
                                    <input type="number" class="form-control" id="edit-rating" name="rating" value="${book.rating}" step="0.1" min="0" max="5" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="edit-reviews" class="form-label">Number of Reviews</label>
                                    <input type="number" class="form-control" id="edit-reviews" name="reviews" value="${book.reviews}" min="0" required>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="saveEditBtn">Save Changes</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();

        // Handle save button click
        const saveBtn = modal.querySelector('#saveEditBtn');
        saveBtn.addEventListener('click', () => {
            const form = modal.querySelector('#editBookForm');
            const formData = new FormData(form);
            const updatedData = {
                title: formData.get('title'),
                author: formData.get('author'),
                price: parseFloat(formData.get('price')),
                category: formData.get('category'),
                language: formData.get('language'),
                imageUrl: formData.get('imageUrl'),
                description: formData.get('description'),
                isbn: formData.get('isbn'),
                publishDate: formData.get('publishDate'),
                publisher: formData.get('publisher'),
                pageCount: parseInt(formData.get('pageCount')),
                rating: parseFloat(formData.get('rating')),
                reviews: parseInt(formData.get('reviews'))
            };

            this.handleUpdateBook(book.id, updatedData);
            modalInstance.hide();
        });

        // Remove modal when it's hidden
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    },

    showSuccess(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.container').insertBefore(alert, document.querySelector('.card'));
        setTimeout(() => alert.remove(), 5000);
    },

    showError(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.container').insertBefore(alert, document.querySelector('.card'));
        setTimeout(() => alert.remove(), 5000);
    }
};

// Initialize the module when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    manageBooksModule.init();
});

export default manageBooksModule; 