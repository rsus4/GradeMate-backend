<h1 align="center">
  GradeMate
  <br>
</h1>

<h4 align="center">Grade Moderation Made Easy and Secure!</h4>

<p align="center">
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"
         alt="React">
  </a>
  <a href="https://nodejs.org/en">
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"
         alt="Node">
  </a>
  <a href="https://www.npmjs.com/">
    <img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white"
         alt="npm">
  </a>
  
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"
         alt="Next">
  </a>
  <a href="https://nodemon.io/">
    <img src="https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD"
         alt="NodeMon">
  </a>
  <a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"
         alt="Mongo">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#running-backend">Running Backend</a> •
  <a href="#download">Download</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

<h1 align="center">
  <a href="https://github.com/rsus4/GradeMate-backend/"><img src="https://user-images.githubusercontent.com/55681207/235140518-07be1343-6f9c-4bd0-91e1-ec4b9ed4ba02.png" alt="GradeMate" width="570"></a>
<br>
</h1>


## Key Features

### Functionality
* User creation and authentication
* File upload and graph plotting 
* Plotting multiple graphs
* Dynamic Comparisons
* Saving of previous plots and access through home
* User profile
* Help and FAQs

### Usable Security
* User Authentication - The system requires faculty members to log in using their university credentials to ensure that only authorized users have access to the system (disabled for testing to allow students to make accounts and test the system)
* Two-Factor Authentication - OTP for second layer of security
* Data Encryption - Sensitive information such as grades is encrypted to protect it from unauthorized access or theft.
* Access Control - Access controls are be implemented to ensure that faculty members only have access to the data they need for their own courses.  
* Auditing - The system will keep a record of all access and changes to grades to detect and respond to potential security incidents
* Intuitive Interface - User friendly design based on participatory design


## Running Backend

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# REQUIREMENTS
# Installation 
$ sudo apt update
$ sudo apt install nodejs
$ sudo apt install npm
$ npm install -g npm
$ npm install -g nodemon --save
$ npm install react react-dom next
# For execution
$ Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# REPOSITORY
# Clone this repository
$ git clone https://github.com/rsus4/GradeMate-backend/
# Go into the repository
$ cd GradeMate-backend

# RUNNING
# Rebuild Required dependencies (if this is not sufficient, try npm install)
$ npm rebuild bcrypt --build-from-source 
# Run the app
$ nodemon index.js
```

> **Note**
> If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the Poweshell/Command Prompt.


## License

MIT


## Need Help? 🤝
Feel free to make bug reports on issues. Reach out in case you need further assistance. 

*Contact us:*

🎸 Rishit: rishit19091@iiitd.ac.in

🎨 Dhairya: dhairya19035@iiitd.ac.in

*****

<p align="center">
Made with ❤️ by Team RnD
</p>
