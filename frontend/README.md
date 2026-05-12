# Welcome to My To-Do List App

A modern **React Native To-Do List application** built with **Expo**, designed to help you stay organized. Add tasks, set optional reminders, and visually track them with colored indicators.  

---

## 🌟 Features

- **Add Tasks:** Quickly add new tasks to your list.  
- **Set Reminders:** Optional time reminders for each task.  
- **Delete Tasks:** Remove tasks individually.  
- **Stylish UI:** Rounded inputs, buttons, and cards with shadows.  
- **Keyboard Friendly:** Input adjusts with keyboard using `KeyboardAvoidingView`.  

---

## 📱 Screenshots
![App Screenshot](screenshots/task-list.png)
![App Screenshot](screenshots/add-task.png)
![App Screenshot](screenshots/enter-task.png)



---

## ⚡ Installation

### Prerequisites

- Node.js installed
- Expo CLI installed globally:

```bash
npm install -g expo-cli
Android Emulator or physical device for testing

Steps
Clone the repository:

bash
Copy code
git clone <your-repo-url>
cd To_Do_List/frontend
Install dependencies:

bash
Copy code
npm install
Start the Expo project:

bash
Copy code
expo start
Open the app on Android Emulator (press a) or scan the QR code using Expo Go on a physical device.

Note: For iOS, use expo start and scan with Expo Go on an iPhone.

🔧 Backend Setup
Navigate to the backend folder:

bash
Copy code
cd ../backend
Install dependencies:

bash
Copy code
npm install
Start the backend server:

bash
Copy code
node server.js
Ensure the backend server is running at:

arduino
Copy code
http://localhost:3000
For Android Emulator, the frontend uses http://10.0.2.2:3000 to connect to the backend.

🚀 Usage
Open the app in Expo Go or emulator.

Enter a task in “Add a new task” field.

Optionally, set a reminder in “Set reminder (HH:MM)” field.

Press Add Task.

Tasks appear below with colored left indicators.

Delete a task by pressing the ❌ button.

🗂️ File Structure
pgsql
Copy code
To_Do_List/
├── backend/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── app/
    │   └── index.js
    ├── package.json
    └── tsconfig.json
🛠 Dependencies
React Native

Expo

react hooks: useState, useEffect

react-native core components

🌈 Future Improvements
Task completion toggle (complete/incomplete)

Swipe-to-delete functionality

Push notifications for reminders

Persist tasks using a database (MongoDB / SQLite)

Dark mode support