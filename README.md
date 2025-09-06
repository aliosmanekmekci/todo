# 📝 Modern Todo App

A beautiful, feature-rich todo application built with vanilla JavaScript, Webpack, and modern web technologies. This project demonstrates clean code architecture, modern UI/UX design, and educational best practices.

## 🌐 Live Demo

**🔗 [View Live Demo](https://aliosmanekmekci.github.io/todo/)**

## ✨ Features

### 🎯 Core Functionality
- **Project Management**: Create and switch between multiple projects
- **Todo Management**: Add, edit, delete, and mark todos as complete
- **Smart Date Handling**: Intelligent date formatting with overdue detection
- **Priority System**: Color-coded priority levels (Low, Medium, High)
- **Data Persistence**: All data saved to localStorage

### 🎨 Modern UI/UX
- **Glass-morphism Design**: Beautiful semi-transparent elements with backdrop blur
- **Responsive Layout**: Works perfectly on desktop and mobile devices
- **Smooth Animations**: Hover effects and transitions throughout
- **Modal System**: Modern modals replace browser alerts and prompts
- **Visual Feedback**: Color-coded priorities and due dates

### 🚀 Technical Features
- **Date-fns Integration**: Smart date formatting and manipulation
- **Webpack Build System**: Modern bundling and development workflow
- **ES6+ JavaScript**: Modern JavaScript features and best practices
- **Modular Architecture**: Clean separation of concerns
- **Error Handling**: Graceful fallbacks and validation

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Build Tool**: Webpack 5
- **Date Library**: date-fns
- **Styling**: Custom CSS with modern features (backdrop-filter, gradients)
- **Development**: Babel, CSS Loader, Style Loader

## 📁 Project Structure

```
src/
├── index.js          # Entry point
├── app.js            # Main application controller
├── modules/
│   ├── Todo.js       # Todo data model
│   ├── Project.js    # Project data model
│   └── UI.js         # User interface management
├── styles/
│   └── style.css     # Application styles
└── index.html        # HTML template
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aliosmanekmekci/todo.git
   cd todo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run watch` - Build and watch for changes

## 🎓 Learning Objectives

This project demonstrates:

### For Beginners
- **Class-based Architecture**: How to structure JavaScript applications
- **DOM Manipulation**: Creating and managing HTML elements
- **Event Handling**: User interactions and event delegation
- **Local Storage**: Data persistence in the browser

### For Intermediate Developers
- **Module System**: ES6 modules and code organization
- **Build Tools**: Webpack configuration and bundling
- **Modern JavaScript**: ES6+ features and best practices
- **Error Handling**: Graceful fallbacks and validation

### For Advanced Developers
- **Separation of Concerns**: Clean architecture principles
- **Code Documentation**: JSDoc comments and maintainability
- **Performance**: Efficient DOM updates and event handling
- **User Experience**: Modern UI patterns and accessibility

## 🔧 Key Features Explained

### Smart Date Formatting
The app uses date-fns to provide intelligent date display:
- **Overdue**: Red highlighting for past due dates
- **Due Today**: Orange highlighting for today's tasks
- **Due Soon**: Yellow highlighting for upcoming tasks
- **Future Dates**: Standard formatting for distant dates

### Modal System
Replaced browser alerts with a custom modal system:
- **Form Validation**: Client-side validation with visual feedback
- **User Experience**: Smooth animations and better interaction
- **Accessibility**: Keyboard navigation and focus management

### Data Architecture
Clean separation between data models and UI:
- **Todo Class**: Individual todo item management
- **Project Class**: Collection of todos with management methods
- **UI Class**: DOM manipulation and user interaction handling

## 🎨 Design Philosophy

### Visual Design
- **Glass-morphism**: Modern semi-transparent design language
- **Color Psychology**: Intuitive color coding for priorities and dates
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent spacing and visual rhythm

### User Experience
- **Intuitive Navigation**: Clear project and todo management
- **Visual Feedback**: Immediate response to user actions
- **Error Prevention**: Form validation and helpful prompts
- **Responsive Design**: Seamless experience across devices

## 📚 Educational Value

This project serves as an excellent learning resource for:

1. **JavaScript Fundamentals**: Classes, modules, and modern syntax
2. **Web Development**: HTML, CSS, and JavaScript integration
3. **Build Tools**: Webpack configuration and development workflow
4. **Code Organization**: Clean, maintainable code structure
5. **User Interface**: Modern design patterns and interactions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **The Odin Project** - For the original project requirements and learning path
- **date-fns** - For excellent date manipulation utilities
- **Webpack** - For the powerful build system
- **Modern CSS** - For enabling beautiful design possibilities

## 📞 Contact

**Ali Osman Ekmekci**
- GitHub: [@aliosmanekmekci](https://github.com/aliosmanekmekci)
- Project Link: [https://github.com/aliosmanekmekci/todo](https://github.com/aliosmanekmekci/todo)

---

⭐ **Star this repository if you found it helpful!**