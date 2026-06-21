import { useState } from 'react'
import './App.css'

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [selectedTime, setSelectedTime] = useState(null)
  const [bookingStep, setBookingStep] = useState(1)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

  // 100 Telugu Movies Data
  const movies = [
    // Blockbusters 1-20
    {
      id: 1,
      title: "RRR",
      rating: 8.8,
      description: "A fictional story of two Indian revolutionaries and their fight against the British Raj.",
      genres: ["Action", "Drama", "Historical"],
      duration: "3h 7m",
      language: "Telugu",
      year: "2022",
      director: "S. S. Rajamouli",
      cast: ["Jr. NTR", "Ram Charan", "Alia Bhatt"]
    },
    {
      id: 2,
      title: "Baahubali 2",
      rating: 9.0,
      description: "The conclusion to the epic saga of Shivudu and his journey to become the king.",
      genres: ["Action", "Fantasy", "Drama"],
      duration: "2h 47m",
      language: "Telugu",
      year: "2017",
      director: "S. S. Rajamouli",
      cast: ["Prabhas", "Rana Daggubati", "Anushka Shetty"]
    },
    {
      id: 3,
      title: "Kalki 2898 AD",
      rating: 8.5,
      description: "A sci-fi epic set in the future with mythological elements.",
      genres: ["Sci-Fi", "Action", "Adventure"],
      duration: "3h 0m",
      language: "Telugu",
      year: "2024",
      director: "Nag Ashwin",
      cast: ["Prabhas", "Amitabh Bachchan", "Deepika Padukone"]
    },
    {
      id: 4,
      title: "Salaar",
      rating: 8.2,
      description: "A story of friendship, betrayal, and power in a fictional city.",
      genres: ["Action", "Thriller", "Drama"],
      duration: "2h 55m",
      language: "Telugu",
      year: "2023",
      director: "Prashanth Neel",
      cast: ["Prabhas", "Prithviraj Sukumaran", "Shruti Haasan"]
    },
    {
      id: 5,
      title: "Pushpa",
      rating: 8.1,
      description: "The rise of a daily wage laborer in the red sandalwood smuggling world.",
      genres: ["Action", "Crime", "Drama"],
      duration: "2h 59m",
      language: "Telugu",
      year: "2021",
      director: "Sukumar",
      cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil"]
    },
    {
      id: 6,
      title: "Mahanati",
      rating: 8.9,
      description: "The biopic of legendary actress Savitri and her journey in cinema.",
      genres: ["Biography", "Drama", "History"],
      duration: "2h 57m",
      language: "Telugu",
      year: "2018",
      director: "Nag Ashwin",
      cast: ["Keerthy Suresh", "Dulquer Salmaan", "Vijay Deverakonda"]
    },
    {
      id: 7,
      title: "Jersey",
      rating: 8.7,
      description: "A failed cricketer's journey to fulfill his dream of playing for India.",
      genres: ["Sports", "Drama", "Inspiration"],
      duration: "2h 37m",
      language: "Telugu",
      year: "2019",
      director: "Gowtam Tinnanuri",
      cast: ["Nani", "Shraddha Srinath", "Sathyaraj"]
    },
    {
      id: 8,
      title: "Sir",
      rating: 8.6,
      description: "A government school teacher's fight for the rights of his students.",
      genres: ["Drama", "Inspiration", "Social"],
      duration: "2h 50m",
      language: "Telugu",
      year: "2023",
      director: "Venu Yeldandi",
      cast: ["Dhanush", "Samyuktha", "Sai Kumar"]
    },
    {
      id: 9,
      title: "Ala Vaikunthapurramuloo",
      rating: 8.4,
      description: "A man discovers his true identity and the family he never knew.",
      genres: ["Action", "Comedy", "Family"],
      duration: "2h 45m",
      language: "Telugu",
      year: "2020",
      director: "Trivikram Srinivas",
      cast: ["Allu Arjun", "Pooja Hegde", "Tabu"]
    },
    {
      id: 10,
      title: "Dasara",
      rating: 8.0,
      description: "A tale of friendship, love, and revenge in a rural village.",
      genres: ["Action", "Drama", "Thriller"],
      duration: "2h 35m",
      language: "Telugu",
      year: "2023",
      director: "Srikanth Odela",
      cast: ["Nani", "Keerthy Suresh", "Dheekshith Shetty"]
    },
    {
      id: 11,
      title: "Baahubali",
      rating: 8.8,
      description: "A child from a small village discovers his destiny to become a legendary king.",
      genres: ["Action", "Fantasy", "Drama"],
      duration: "2h 39m",
      language: "Telugu",
      year: "2015",
      director: "S. S. Rajamouli",
      cast: ["Prabhas", "Rana Daggubati", "Anushka Shetty"]
    },
    {
      id: 12,
      title: "Arjun Reddy",
      rating: 8.4,
      description: "A brilliant surgeon's life spirals into self-destruction after a heartbreak.",
      genres: ["Romance", "Drama", "Thriller"],
      duration: "2h 56m",
      language: "Telugu",
      year: "2017",
      director: "Sandeep Reddy Vanga",
      cast: ["Vijay Deverakonda", "Shalini Pandey", "Jia Sharma"]
    },
    {
      id: 13,
      title: "Rangasthalam",
      rating: 8.7,
      description: "A hearing-impaired man fights against corrupt village politics.",
      genres: ["Action", "Drama", "Thriller"],
      duration: "2h 50m",
      language: "Telugu",
      year: "2018",
      director: "Sukumar",
      cast: ["Ram Charan", "Samantha Ruth Prabhu", "Aadhi"]
    },
    {
      id: 14,
      title: "Geetha Govindam",
      rating: 8.2,
      description: "A young man's life turns upside down when his girlfriend's sister misunderstands him.",
      genres: ["Romance", "Comedy", "Family"],
      duration: "2h 25m",
      language: "Telugu",
      year: "2018",
      director: "Parasuram",
      cast: ["Vijay Deverakonda", "Rashmika Mandanna", "Subbaraju"]
    },
    {
      id: 15,
      title: "Maharshi",
      rating: 7.8,
      description: "A successful businessman returns to his roots to help farmers.",
      genres: ["Drama", "Action", "Inspiration"],
      duration: "2h 50m",
      language: "Telugu",
      year: "2019",
      director: "Vamshi Paidipally",
      cast: ["Mahesh Babu", "Pooja Hegde", "Allari Naresh"]
    },
    {
      id: 16,
      title: "Sye Raa Narasimha Reddy",
      rating: 7.9,
      description: "The story of a freedom fighter from the Rayalaseema region.",
      genres: ["Action", "Historical", "Drama"],
      duration: "2h 52m",
      language: "Telugu",
      year: "2019",
      director: "Surender Reddy",
      cast: ["Chiranjeevi", "Amitabh Bachchan", "Sudeep"]
    },
    {
      id: 17,
      title: "Dear Comrade",
      rating: 7.6,
      description: "A university student's journey through love, anger, and redemption.",
      genres: ["Romance", "Drama", "Thriller"],
      duration: "2h 35m",
      language: "Telugu",
      year: "2019",
      director: "Bharat Kamma",
      cast: ["Vijay Deverakonda", "Rashmika Mandanna", "Shruti Ramachandran"]
    },
    {
      id: 18,
      title: "Sarileru Neekevvaru",
      rating: 7.5,
      description: "An army major goes on a mission to protect a family in a village.",
      genres: ["Action", "Comedy", "Drama"],
      duration: "2h 45m",
      language: "Telugu",
      year: "2020",
      director: "Anil Ravipudi",
      cast: ["Mahesh Babu", "Rashmika Mandanna", "Vijayashanti"]
    },
    {
      id: 19,
      title: "Bheemla Nayak",
      rating: 7.7,
      description: "A police officer and a retired soldier's clash over a minor incident.",
      genres: ["Action", "Drama", "Thriller"],
      duration: "2h 40m",
      language: "Telugu",
      year: "2022",
      director: "Saagar K Chandra",
      cast: ["Pawan Kalyan", "Rana Daggubati", "Nithya Menen"]
    },
    {
      id: 20,
      title: "Fidaa",
      rating: 8.3,
      description: "A love story between a village girl and an NRI doctor.",
      genres: ["Romance", "Family", "Drama"],
      duration: "2h 28m",
      language: "Telugu",
      year: "2017",
      director: "Sekhar Kammula",
      cast: ["Varun Tej", "Sai Pallavi", "Raja Chembolu"]
    },
    // 21-40
    {
      id: 21,
      title: "Goodachari",
      rating: 8.1,
      description: "A young man's journey to become a RAW agent and uncover a conspiracy.",
      genres: ["Action", "Thriller", "Spy"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2018",
      director: "Sashi Kiran Tikka",
      cast: ["Adivi Sesh", "Sobhita Dhulipala", "Prakash Raj"]
    },
    {
      id: 22,
      title: "KGF Chapter 1",
      rating: 8.6,
      description: "The rise of a young man from poverty to become a feared gangster.",
      genres: ["Action", "Crime", "Drama"],
      duration: "2h 55m",
      language: "Telugu",
      year: "2018",
      director: "Prashanth Neel",
      cast: ["Yash", "Srinidhi Shetty", "Anant Nag"]
    },
    {
      id: 23,
      title: "KGF Chapter 2",
      rating: 8.7,
      description: "The continuation of Rocky's rule and his battle with rival powers.",
      genres: ["Action", "Crime", "Drama"],
      duration: "2h 52m",
      language: "Telugu",
      year: "2022",
      director: "Prashanth Neel",
      cast: ["Yash", "Srinidhi Shetty", "Sanjay Dutt"]
    },
    {
      id: 24,
      title: "Vikram",
      rating: 8.4,
      description: "A special agent's mission to stop a drug cartel and find his son.",
      genres: ["Action", "Thriller", "Crime"],
      duration: "2h 55m",
      language: "Telugu",
      year: "2022",
      director: "Lokesh Kanagaraj",
      cast: ["Kamal Haasan", "Vijay Sethupathi", "Fahadh Faasil"]
    },
    {
      id: 25,
      title: "Ponniyin Selvan 1",
      rating: 8.3,
      description: "The epic tale of the Chola kingdom and its political intrigue.",
      genres: ["Historical", "Action", "Drama"],
      duration: "2h 47m",
      language: "Telugu",
      year: "2022",
      director: "Mani Ratnam",
      cast: ["Vikram", "Aishwarya Rai", "Jayam Ravi"]
    },
    {
      id: 26,
      title: "Ponniyin Selvan 2",
      rating: 8.2,
      description: "The conclusion of the Chola empire's greatest saga.",
      genres: ["Historical", "Action", "Drama"],
      duration: "2h 45m",
      language: "Telugu",
      year: "2023",
      director: "Mani Ratnam",
      cast: ["Vikram", "Aishwarya Rai", "Jayam Ravi"]
    },
    {
      id: 27,
      title: "Leo",
      rating: 7.9,
      description: "A man's dark past catches up with him in a Himalayan town.",
      genres: ["Action", "Thriller", "Drama"],
      duration: "2h 43m",
      language: "Telugu",
      year: "2023",
      director: "Lokesh Kanagaraj",
      cast: ["Vijay", "Trisha", "Sanjay Dutt"]
    },
    {
      id: 28,
      title: "Jawan",
      rating: 8.0,
      description: "A man on a mission to avenge his mother's death and fight corruption.",
      genres: ["Action", "Drama", "Thriller"],
      duration: "2h 49m",
      language: "Telugu",
      year: "2023",
      director: "Atlee",
      cast: ["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi"]
    },
    {
      id: 29,
      title: "Animal",
      rating: 7.8,
      description: "The story of a man's violent love for his family and his dark side.",
      genres: ["Action", "Drama", "Crime"],
      duration: "3h 22m",
      language: "Telugu",
      year: "2023",
      director: "Sandeep Reddy Vanga",
      cast: ["Ranbir Kapoor", "Rashmika Mandanna", "Anil Kapoor"]
    },
    {
      id: 30,
      title: "Game Changer",
      rating: 7.5,
      description: "A government official's fight against corruption in the system.",
      genres: ["Action", "Drama", "Political"],
      duration: "2h 40m",
      language: "Telugu",
      year: "2024",
      director: "Shankar",
      cast: ["Ram Charan", "Kiara Advani", "Anjali"]
    },
    // 31-50
    {
      id: 31,
      title: "Agent",
      rating: 7.2,
      description: "A young agent's mission to uncover a dangerous conspiracy.",
      genres: ["Action", "Thriller", "Spy"],
      duration: "2h 30m",
      language: "Telugu",
      year: "2023",
      director: "Surender Reddy",
      cast: ["Akhil Akkineni", "Sakshi Vaidya", "Suresh Oberoi"]
    },
    {
      id: 32,
      title: "Veera Simha Reddy",
      rating: 7.8,
      description: "A powerful man's fight against injustice and corruption.",
      genres: ["Action", "Drama", "Thriller"],
      duration: "2h 55m",
      language: "Telugu",
      year: "2023",
      director: "Gopichand Malineni",
      cast: ["Nandamuri Balakrishna", "Shruti Haasan", "Duniya Vijay"]
    },
    {
      id: 33,
      title: "Waltair Veerayya",
      rating: 7.6,
      description: "A fisherman's journey to protect his community and family.",
      genres: ["Action", "Drama", "Family"],
      duration: "2h 45m",
      language: "Telugu",
      year: "2023",
      director: "K. S. Ravindra",
      cast: ["Chiranjeevi", "Ravi Teja", "Shruti Haasan"]
    },
    {
      id: 34,
      title: "Vinaro Bhagyamu Vishnu Katha",
      rating: 7.4,
      description: "A young man's life changes when he meets a mysterious woman.",
      genres: ["Romance", "Drama", "Comedy"],
      duration: "2h 38m",
      language: "Telugu",
      year: "2023",
      director: "Murali Karthikeya",
      cast: ["Kiran Abbavaram", "Saahas", "Sindhuri"]
    },
    {
      id: 35,
      title: "Ravanasura",
      rating: 7.3,
      description: "A lawyer's dark side emerges when he's pushed to the edge.",
      genres: ["Action", "Thriller", "Crime"],
      duration: "2h 35m",
      language: "Telugu",
      year: "2023",
      director: "Sudheer Varma",
      cast: ["Ravi Teja", "Sushanth", "Megha Akash"]
    },
    {
      id: 36,
      title: "Virupaksha",
      rating: 7.9,
      description: "A village plagued by mysterious deaths and a stranger's arrival.",
      genres: ["Horror", "Thriller", "Mystery"],
      duration: "2h 50m",
      language: "Telugu",
      year: "2023",
      director: "Karthik Dandu",
      cast: ["Sai Dharam Tej", "Samyuktha", "Sunil"]
    },
    {
      id: 37,
      title: "Custody",
      rating: 7.1,
      description: "A police officer's life takes a dangerous turn during a high-stakes case.",
      genres: ["Action", "Thriller", "Crime"],
      duration: "2h 40m",
      language: "Telugu",
      year: "2023",
      director: "Venkat Prabhu",
      cast: ["Naga Chaitanya", "Krithi Shetty", "Arvind Swamy"]
    },
    {
      id: 38,
      title: "Dhamaka",
      rating: 7.5,
      description: "A news anchor's life is turned upside down by a terrorist threat.",
      genres: ["Action", "Thriller", "Drama"],
      duration: "2h 25m",
      language: "Telugu",
      year: "2022",
      director: "Trinadha Rao Nakkina",
      cast: ["Ravi Teja", "Sreeleela", "Jayaram"]
    },
    {
      id: 39,
      title: "Ghani",
      rating: 7.0,
      description: "A boxer's journey to overcome personal demons and achieve greatness.",
      genres: ["Sports", "Drama", "Inspiration"],
      duration: "2h 32m",
      language: "Telugu",
      year: "2022",
      director: "Kiran Korrapati",
      cast: ["Varun Tej", "Upendra", "Saiee Manjrekar"]
    },
    {
      id: 40,
      title: "Acharya",
      rating: 6.8,
      description: "A temple priest's fight against corrupt forces in his village.",
      genres: ["Action", "Drama", "Social"],
      duration: "2h 35m",
      language: "Telugu",
      year: "2022",
      director: "Koratala Siva",
      cast: ["Chiranjeevi", "Ram Charan", "Pooja Hegde"]
    },
    // 41-60
    {
      id: 41,
      title: "Red",
      rating: 7.2,
      description: "A forensic expert's investigation into a series of mysterious murders.",
      genres: ["Thriller", "Mystery", "Crime"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2021",
      director: "Kishore Tirumala",
      cast: ["Ram Pothineni", "Nivetha Pethuraj", "Malavika Sharma"]
    },
    {
      id: 42,
      title: "Vakeel Saab",
      rating: 8.0,
      description: "A lawyer's fight for justice for three women in a controversial case.",
      genres: ["Legal", "Drama", "Thriller"],
      duration: "2h 45m",
      language: "Telugu",
      year: "2021",
      director: "Venu Sriram",
      cast: ["Pawan Kalyan", "Nivetha Thomas", "Anjali"]
    },
    {
      id: 43,
      title: "Krack",
      rating: 7.8,
      description: "A police officer's battle against a notorious gangster in the city.",
      genres: ["Action", "Crime", "Drama"],
      duration: "2h 30m",
      language: "Telugu",
      year: "2021",
      director: "Gopichand Malineni",
      cast: ["Ravi Teja", "Shruti Haasan", "Varalaxmi Sarathkumar"]
    },
    {
      id: 44,
      title: "Uppena",
      rating: 8.1,
      description: "A passionate love story set against the backdrop of social divisions.",
      genres: ["Romance", "Drama", "Family"],
      duration: "2h 25m",
      language: "Telugu",
      year: "2021",
      director: "Buchi Babu Sana",
      cast: ["Panja Vaisshnav Tej", "Krithi Shetty", "Vijay Sethupathi"]
    },
    {
      id: 45,
      title: "Palasa 1978",
      rating: 8.3,
      description: "A political drama set in the 1970s exploring caste and power dynamics.",
      genres: ["Political", "Drama", "Historical"],
      duration: "2h 40m",
      language: "Telugu",
      year: "2020",
      director: "Karuna Kumar",
      cast: ["Rakshith Gowda", "Siri Vennela", "Naga Mahesh"]
    },
    {
      id: 46,
      title: "Colour Photo",
      rating: 8.2,
      description: "A love story exploring societal taboos and personal acceptance.",
      genres: ["Romance", "Drama", "Social"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2020",
      director: "Sandeep Raj",
      cast: ["Suhas", "Chandini Chowdary", "Sunil"]
    },
    {
      id: 47,
      title: "Uma Maheswara Ugra Roopasya",
      rating: 7.9,
      description: "A photographer's journey of self-discovery and confronting his past.",
      genres: ["Drama", "Comedy", "Adventure"],
      duration: "2h 15m",
      language: "Telugu",
      year: "2020",
      director: "Venkatesh Maha",
      cast: ["Satyadev Kancharana", "Suhasini", "Naresh"]
    },
    {
      id: 48,
      title: "Bheeshma",
      rating: 7.6,
      description: "A young man's journey to find love while dealing with family expectations.",
      genres: ["Romance", "Comedy", "Family"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2020",
      director: "Venky Kudumula",
      cast: ["Naga Chaitanya", "Rashmika Mandanna", "Sampath Raj"]
    },
    {
      id: 49,
      title: "World Famous Lover",
      rating: 7.4,
      description: "A writer's love stories inspire his journey of finding true love.",
      genres: ["Romance", "Drama", "Comedy"],
      duration: "2h 35m",
      language: "Telugu",
      year: "2020",
      director: "Kranthi Madhav",
      cast: ["Vijay Deverakonda", "Raashi Khanna", "Aishwarya Rajesh"]
    },
    {
      id: 50,
      title: "Choosi Choodangaane",
      rating: 7.3,
      description: "A college love story exploring modern relationships and commitment.",
      genres: ["Romance", "Comedy", "Family"],
      duration: "2h 15m",
      language: "Telugu",
      year: "2020",
      director: "Sesh",
      cast: ["Sumanth", "Vennela Kishore", "Rashmi Gautam"]
    },
    // 51-70
    {
      id: 51,
      title: "Love Story",
      rating: 8.2,
      description: "A love story between a middle-class man and a rich woman's daughter.",
      genres: ["Romance", "Drama", "Family"],
      duration: "2h 30m",
      language: "Telugu",
      year: "2021",
      director: "Sekhar Kammula",
      cast: ["Naga Chaitanya", "Sai Pallavi", "Rajeev Kanakala"]
    },
    {
      id: 52,
      title: "Akhanda",
      rating: 8.0,
      description: "A powerful man's fight against an evil politician.",
      genres: ["Action", "Drama", "Thriller"],
      duration: "2h 45m",
      language: "Telugu",
      year: "2021",
      director: "Boyapati Srinu",
      cast: ["Nandamuri Balakrishna", "Pragya Jaiswal", "Srikanth"]
    },
    {
      id: 53,
      title: "Hit: The First Case",
      rating: 8.0,
      description: "A police officer investigates a missing person case.",
      genres: ["Thriller", "Crime", "Mystery"],
      duration: "2h 15m",
      language: "Telugu",
      year: "2020",
      director: "Sailesh Kolanu",
      cast: ["Vishwak Sen", "Ruhani Sharma", "Murali Sharma"]
    },
    {
      id: 54,
      title: "Hit 2",
      rating: 7.9,
      description: "A police officer investigates a new criminal case.",
      genres: ["Thriller", "Crime", "Mystery"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2022",
      director: "Sailesh Kolanu",
      cast: ["Adivi Sesh", "Meenakshi Chaudhary", "Rao Ramesh"]
    },
    {
      id: 55,
      title: "Major",
      rating: 8.5,
      description: "The life story of Major Sandeep Unnikrishnan.",
      genres: ["Biography", "Action", "Drama"],
      duration: "2h 30m",
      language: "Telugu",
      year: "2022",
      director: "Sashi Kiran Tikka",
      cast: ["Adivi Sesh", "Sobhita Dhulipala", "Saiee Manjrekar"]
    },
    {
      id: 56,
      title: "Shyam Singha Roy",
      rating: 8.3,
      description: "A filmmaker discovers his past life connection.",
      genres: ["Romance", "Drama", "Fantasy"],
      duration: "2h 40m",
      language: "Telugu",
      year: "2021",
      director: "Rahul Sankrityan",
      cast: ["Nani", "Sai Pallavi", "Krithi Shetty"]
    },
    {
      id: 57,
      title: "Sreekaram",
      rating: 7.6,
      description: "A man returns to his village to promote farming.",
      genres: ["Drama", "Social", "Family"],
      duration: "2h 25m",
      language: "Telugu",
      year: "2021",
      director: "Kishore B.",
      cast: ["Sharwanand", "Priyanka Arul Mohan", "Rao Ramesh"]
    },
    {
      id: 58,
      title: "Konda Polam",
      rating: 7.7,
      description: "A survival drama set in a forest.",
      genres: ["Adventure", "Drama", "Thriller"],
      duration: "2h 25m",
      language: "Telugu",
      year: "2021",
      director: "Krish Jagarlamudi",
      cast: ["Panja Vaisshnav Tej", "Saiyami Kher", "Rao Ramesh"]
    },
    {
      id: 59,
      title: "Rang De",
      rating: 7.8,
      description: "A young man's journey to find his missing friend.",
      genres: ["Action", "Drama", "Thriller"],
      duration: "2h 25m",
      language: "Telugu",
      year: "2021",
      director: "Venky Atluri",
      cast: ["Nithiin", "Keerthy Suresh", "Vennela Kishore"]
    },
    {
      id: 60,
      title: "Yashoda",
      rating: 7.8,
      description: "A woman's fight for justice in a fertility clinic.",
      genres: ["Thriller", "Crime", "Drama"],
      duration: "2h 30m",
      language: "Telugu",
      year: "2022",
      director: "Hari Shankar",
      cast: ["Samantha Ruth Prabhu", "Unni Mukundan", "Rao Ramesh"]
    },
    // 61-80
    {
      id: 61,
      title: "Sitaram",
      rating: 7.9,
      description: "A love story set in the 1980s.",
      genres: ["Romance", "Drama", "Family"],
      duration: "2h 30m",
      language: "Telugu",
      year: "2022",
      director: "Vijay",
      cast: ["Dulquer Salmaan", "Mrunal Thakur", "Rashmika Mandanna"]
    },
    {
      id: 62,
      title: "Arya 2",
      rating: 7.7,
      description: "A story of friendship, love, and jealousy.",
      genres: ["Romance", "Drama", "Comedy"],
      duration: "2h 40m",
      language: "Telugu",
      year: "2009",
      director: "Sukumar",
      cast: ["Allu Arjun", "Navdeep", "Kajal Aggarwal"]
    },
    {
      id: 63,
      title: "Happy Days",
      rating: 8.2,
      description: "A college friendship drama with humor and emotions.",
      genres: ["Comedy", "Drama", "Romance"],
      duration: "2h 40m",
      language: "Telugu",
      year: "2007",
      director: "Sekhar Kammula",
      cast: ["Varun Sandesh", "Tamannaah", "Nikhil"]
    },
    {
      id: 64,
      title: "Gabbar Singh",
      rating: 8.1,
      description: "A police officer's fight against a corrupt politician.",
      genres: ["Action", "Comedy", "Drama"],
      duration: "2h 35m",
      language: "Telugu",
      year: "2012",
      director: "Harish Shankar",
      cast: ["Pawan Kalyan", "Shruti Haasan", "Abhimanyu Singh"]
    },
    {
      id: 65,
      title: "Athadu",
      rating: 8.4,
      description: "A hired killer's journey to find his true identity.",
      genres: ["Action", "Thriller", "Drama"],
      duration: "2h 50m",
      language: "Telugu",
      year: "2005",
      director: "Trivikram Srinivas",
      cast: ["Mahesh Babu", "Trisha", "Prakash Raj"]
    },
    {
      id: 66,
      title: "Okkadu",
      rating: 8.3,
      description: "A kabaddi player's fight to protect a woman.",
      genres: ["Action", "Romance", "Drama"],
      duration: "2h 45m",
      language: "Telugu",
      year: "2003",
      director: "Gunasekhar",
      cast: ["Mahesh Babu", "Bhumika Chawla", "Prakash Raj"]
    },
    {
      id: 67,
      title: "Bommarillu",
      rating: 8.0,
      description: "A young man's journey to find his own identity.",
      genres: ["Romance", "Family", "Drama"],
      duration: "2h 35m",
      language: "Telugu",
      year: "2006",
      director: "Bhaskar",
      cast: ["Siddharth", "Genelia D'Souza", "Prakash Raj"]
    },
    {
      id: 68,
      title: "Nuvvostanante Nenoddantana",
      rating: 8.1,
      description: "A love story between a city boy and a village girl.",
      genres: ["Romance", "Family", "Drama"],
      duration: "2h 40m",
      language: "Telugu",
      year: "2005",
      director: "Prabhu Deva",
      cast: ["Siddharth", "Trisha", "Srihari"]
    },
    {
      id: 69,
      title: "Murari",
      rating: 8.5,
      description: "A family drama with a mysterious curse.",
      genres: ["Drama", "Family", "Supernatural"],
      duration: "2h 55m",
      language: "Telugu",
      year: "2001",
      director: "Krishna Vamsi",
      cast: ["Mahesh Babu", "Sonali Bendre", "Prakash Raj"]
    },
    {
      id: 70,
      title: "Bimbisara",
      rating: 7.8,
      description: "A ruler's journey through time and redemption.",
      genres: ["Action", "Fantasy", "Drama"],
      duration: "2h 35m",
      language: "Telugu",
      year: "2022",
      director: "Mallidi Vashist",
      cast: ["Nandamuri Kalyan Ram", "Catherine Tresa", "Samuthirakani"]
    },
    // 71-80
    {
      id: 71,
      title: "Zombie Reddy",
      rating: 7.0,
      description: "A horror comedy set in a zombie apocalypse.",
      genres: ["Horror", "Comedy", "Thriller"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2021",
      director: "Prashanth Varma",
      cast: ["Teja Sajja", "Anandhi", "Daksha Nagarkar"]
    },
    {
      id: 72,
      title: "Thimmarusu",
      rating: 7.5,
      description: "A young lawyer fights a tough legal battle.",
      genres: ["Legal", "Drama", "Thriller"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2021",
      director: "J. K. Bharavi",
      cast: ["Satyadev Kancharana", "Priyanka Jawalkar", "Sampath Raj"]
    },
    {
      id: 73,
      title: "Aa Ammayi Gurinchi Meeku Cheppali",
      rating: 7.4,
      description: "A love story with a modern twist.",
      genres: ["Romance", "Comedy", "Drama"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2022",
      director: "Mohana Krishna Indraganti",
      cast: ["Sudheer Babu", "Krithi Shetty", "Vijay"]
    },
    {
      id: 74,
      title: "Ashoka Vanamlo Arjuna Kalyanam",
      rating: 7.3,
      description: "A modern take on love and relationships.",
      genres: ["Romance", "Comedy", "Family"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2022",
      director: "Vidya Sagar",
      cast: ["Vijay Deverakonda", "Ritu Varma", "Murali Sharma"]
    },
    {
      id: 75,
      title: "Macherla Niyojakavargam",
      rating: 7.2,
      description: "A police officer's fight against corruption.",
      genres: ["Action", "Thriller", "Crime"],
      duration: "2h 35m",
      language: "Telugu",
      year: "2022",
      director: "M. S. Raju",
      cast: ["Nithiin", "Krithi Shetty", "Catherine Tresa"]
    },
    {
      id: 76,
      title: "Pakka Commercial",
      rating: 7.0,
      description: "A lawyer's comedic journey through the justice system.",
      genres: ["Comedy", "Legal", "Drama"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2022",
      director: "Maruthi",
      cast: ["Gopichand", "Raashi Khanna", "Sampath Raj"]
    },
    {
      id: 77,
      title: "DSP",
      rating: 7.5,
      description: "A deputy superintendent's battle against crime.",
      genres: ["Action", "Thriller", "Crime"],
      duration: "2h 30m",
      language: "Telugu",
      year: "2022",
      director: "M. S. Raja",
      cast: ["Vijay", "Aishwarya", "Suman"]
    },
    {
      id: 78,
      title: "Nijam",
      rating: 7.3,
      description: "A truth-seeker's journey to uncover a conspiracy.",
      genres: ["Thriller", "Crime", "Mystery"],
      duration: "2h 25m",
      language: "Telugu",
      year: "2023",
      director: "Rahul",
      cast: ["Sumanth", "Anjali", "Murali Sharma"]
    },
    {
      id: 79,
      title: "Rudra",
      rating: 7.4,
      description: "A powerful man's fight against injustice.",
      genres: ["Action", "Drama", "Crime"],
      duration: "2h 35m",
      language: "Telugu",
      year: "2023",
      director: "Sashi",
      cast: ["Nandamuri Balakrishna", "Kajal Aggarwal", "Srikanth"]
    },
    {
      id: 80,
      title: "Guntur Kaaram",
      rating: 7.8,
      description: "A family drama with political undertones.",
      genres: ["Action", "Drama", "Political"],
      duration: "2h 40m",
      language: "Telugu",
      year: "2024",
      director: "Trivikram Srinivas",
      cast: ["Mahesh Babu", "Sreeleela", "Meenakshi Chaudhary"]
    },
    // 81-90
    {
      id: 81,
      title: "Tillu Square",
      rating: 7.3,
      description: "A comedy of errors with a confused young man.",
      genres: ["Comedy", "Romance", "Thriller"],
      duration: "2h 10m",
      language: "Telugu",
      year: "2024",
      director: "Mallik Ram",
      cast: ["Siddhu Jonnalagadda", "Anupama Parameswaran", "Murali Sharma"]
    },
    {
      id: 82,
      title: "Siren",
      rating: 7.6,
      description: "A thriller about a serial killer's reign of terror.",
      genres: ["Thriller", "Crime", "Mystery"],
      duration: "2h 25m",
      language: "Telugu",
      year: "2024",
      director: "Prashanth",
      cast: ["Venky", "Rashmika Mandanna", "Naveen Chandra"]
    },
    {
      id: 83,
      title: "Bhaje Vaayu Vega",
      rating: 7.2,
      description: "An action-packed adventure of a misunderstood man.",
      genres: ["Action", "Adventure", "Drama"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2024",
      director: "Aravind",
      cast: ["Saipallavi", "Naga Chaitanya", "Suman"]
    },
    {
      id: 84,
      title: "Rudrangi",
      rating: 7.7,
      description: "A period drama set in medieval India.",
      genres: ["Historical", "Action", "Drama"],
      duration: "2h 40m",
      language: "Telugu",
      year: "2024",
      director: "Vijay",
      cast: ["Nani", "Samantha", "Prakash Raj"]
    },
    {
      id: 85,
      title: "Love Story (2021)",
      rating: 8.2,
      description: "A beautiful love story with social commentary.",
      genres: ["Romance", "Drama", "Social"],
      duration: "2h 30m",
      language: "Telugu",
      year: "2021",
      director: "Sekhar Kammula",
      cast: ["Naga Chaitanya", "Sai Pallavi", "Rajeev Kanakala"]
    },
    {
      id: 86,
      title: "Alludu Adhurs",
      rating: 7.5,
      description: "A young man's comedy-filled journey to win his love.",
      genres: ["Comedy", "Romance", "Family"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2021",
      director: "Santosh Srinivas",
      cast: ["Bellamkonda Sreenivas", "Nabha Natesh", "Anu Emmanuel"]
    },
    {
      id: 87,
      title: "Naa Saami Ranga",
      rating: 7.4,
      description: "A small-town man's journey to protect his honor.",
      genres: ["Action", "Drama", "Romance"],
      duration: "2h 25m",
      language: "Telugu",
      year: "2024",
      director: "Mahesh Reddy",
      cast: ["Nandamuri Balakrishna", "Kajal Aggarwal", "Daggubati Venkatesh"]
    },
    {
      id: 88,
      title: "Paagal",
      rating: 7.1,
      description: "A love story of a man with unique perspectives on life.",
      genres: ["Romance", "Comedy", "Drama"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2021",
      director: "Naresh Kuppili",
      cast: ["Vishwak Sen", "Nivetha Pethuraj", "Simran"]
    },
    {
      id: 89,
      title: "Gaali Sampath",
      rating: 7.4,
      description: "A comedy about a common man's extraordinary journey.",
      genres: ["Comedy", "Drama", "Family"],
      duration: "2h 15m",
      language: "Telugu",
      year: "2021",
      director: "Anand Ranga",
      cast: ["Sumanth", "Nabha Natesh", "Tanusree Dutta"]
    },
    {
      id: 90,
      title: "Solo Brathuke So Better",
      rating: 7.2,
      description: "A man's funny journey to prove he's better off single.",
      genres: ["Comedy", "Romance", "Drama"],
      duration: "2h 15m",
      language: "Telugu",
      year: "2020",
      director: "Subbu",
      cast: ["Sai Tej", "Nabha Natesh", "Murali Sharma"]
    },
    // 91-100
    {
      id: 91,
      title: "Mishan Impossible",
      rating: 7.0,
      description: "A fun adventure with three young friends.",
      genres: ["Comedy", "Adventure", "Family"],
      duration: "2h 10m",
      language: "Telugu",
      year: "2022",
      director: "Swaroop",
      cast: ["Dhruv", "Rashmika", "Brahmanandam"]
    },
    {
      id: 92,
      title: "B.A. B.Sc. B.Com",
      rating: 7.3,
      description: "A light-hearted college comedy drama.",
      genres: ["Comedy", "Drama", "Romance"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2022",
      director: "Suresh",
      cast: ["Sumanth", "Kriti", "Srinivas Reddy"]
    },
    {
      id: 93,
      title: "Krishna Vrinda Vihari",
      rating: 7.6,
      description: "A romantic drama with unexpected twists.",
      genres: ["Romance", "Drama", "Comedy"],
      duration: "2h 25m",
      language: "Telugu",
      year: "2022",
      director: "Sashi",
      cast: ["Naga Shaurya", "Shirley Setia", "Sampath Raj"]
    },
    {
      id: 94,
      title: "Sehari",
      rating: 7.1,
      description: "A thriller set in a small town.",
      genres: ["Thriller", "Crime", "Mystery"],
      duration: "2h 15m",
      language: "Telugu",
      year: "2022",
      director: "Rahul",
      cast: ["Varun Tej", "Rashmi", "Prakash Raj"]
    },
    {
      id: 95,
      title: "Nandhi",
      rating: 7.7,
      description: "A psychological thriller with family drama.",
      genres: ["Thriller", "Drama", "Crime"],
      duration: "2h 25m",
      language: "Telugu",
      year: "2022",
      director: "Vijay",
      cast: ["Sumanth", "Mansi", "Rao Ramesh"]
    },
    {
      id: 96,
      title: "Koditheka",
      rating: 7.0,
      description: "A village drama with powerful performances.",
      genres: ["Drama", "Family", "Social"],
      duration: "2h 20m",
      language: "Telugu",
      year: "2023",
      director: "Suresh",
      cast: ["Naga Chaitanya", "Samantha", "Prakash Raj"]
    },
    {
      id: 97,
      title: "The Kashmir Files (Telugu)",
      rating: 8.4,
      description: "The story of the Kashmiri Pandits' exodus.",
      genres: ["Drama", "Historical", "Political"],
      duration: "2h 50m",
      language: "Telugu",
      year: "2022",
      director: "Vivek Agnihotri",
      cast: ["Mithun Chakraborty", "Anupam Kher", "Darshan Kumaar"]
    },
    {
      id: 98,
      title: "Vendhu Thanindhathu Kaadu (Telugu)",
      rating: 7.6,
      description: "A young man's journey from poverty to power.",
      genres: ["Action", "Drama", "Crime"],
      duration: "2h 45m",
      language: "Telugu",
      year: "2022",
      director: "Gautham Vasudev Menon",
      cast: ["Simbu", "Siddhi Idnani", "Raadhika Sarathkumar"]
    },
    {
      id: 99,
      title: "Naa Vakeel Saab",
      rating: 8.0,
      description: "A powerful courtroom drama with social commentary.",
      genres: ["Legal", "Drama", "Thriller"],
      duration: "2h 45m",
      language: "Telugu",
      year: "2021",
      director: "Venu Sriram",
      cast: ["Pawan Kalyan", "Nivetha Thomas", "Anjali"]
    },
    {
      id: 100,
      title: "Krack (Telugu)",
      rating: 7.8,
      description: "A police officer's battle against a notorious gangster.",
      genres: ["Action", "Crime", "Drama"],
      duration: "2h 30m",
      language: "Telugu",
      year: "2021",
      director: "Gopichand Malineni",
      cast: ["Ravi Teja", "Shruti Haasan", "Varalaxmi Sarathkumar"]
    }
  ]

  const showtimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM']
  const seats = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8',
                 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8',
                 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8']
  const bookedSeats = ['A3', 'A4', 'B5', 'C7']

  // Get unique genres from all movies
  const allGenres = ['All', ...new Set(movies.flatMap(movie => movie.genres))].sort()

  // Filter movies based on selected genre
  const filteredMovies = activeFilter === 'All' 
    ? movies 
    : movies.filter(movie => movie.genres.includes(activeFilter))

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
    setShowBooking(true)
    setBookingStep(1)
    setSelectedSeats([])
    setSelectedTime(null)
  }

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return
    setSelectedSeats(prev => 
      prev.includes(seat) 
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    )
  }

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat')
      return
    }
    if (!selectedTime) {
      alert('Please select a showtime')
      return
    }
    setBookingStep(2)
  }

  const handleConfirm = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields')
      return
    }
    setBookingConfirmed(true)
    setTimeout(() => {
      setShowBooking(false)
      setBookingConfirmed(false)
      setSelectedMovie(null)
      setSelectedSeats([])
      setSelectedTime(null)
      setFormData({ name: '', email: '', phone: '' })
      setBookingStep(1)
      alert('🎉 Booking confirmed! Enjoy the movie!')
    }, 2000)
  }

  return (
    <div>
      {/* Navigation */}
      <nav style={{
        padding: '1rem 2rem',
        background: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🎬</span>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #ff6b6b, #ee5a24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>CineBook</span>
            <span style={{
              fontSize: '0.7rem',
              background: 'rgba(255, 107, 107, 0.2)',
              padding: '2px 10px',
              borderRadius: '20px',
              color: '#ff6b6b',
              marginLeft: '0.5rem'
            }}>Telugu</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#888' }}>
            <span style={{ cursor: 'pointer', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = '#ff6b6b'} onMouseLeave={e => e.target.style.color = '#888'}>Home</span>
            <span style={{ cursor: 'pointer', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = '#ff6b6b'} onMouseLeave={e => e.target.style.color = '#888'}>Movies</span>
            <span style={{ cursor: 'pointer', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = '#ff6b6b'} onMouseLeave={e => e.target.style.color = '#888'}>My Bookings</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        padding: '3rem 2rem',
        marginBottom: '2rem',
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(255, 107, 107, 0.15)',
              padding: '0.3rem 1.2rem',
              borderRadius: '20px',
              color: '#ff6b6b',
              fontSize: '0.9rem'
            }}>🎥 Now Showing</span>
            <span style={{
              background: 'rgba(255, 215, 0, 0.15)',
              padding: '0.3rem 1.2rem',
              borderRadius: '20px',
              color: '#ffd700',
              fontSize: '0.9rem'
            }}>⭐ Top Rated</span>
            <span style={{
              background: 'rgba(0, 255, 200, 0.15)',
              padding: '0.3rem 1.2rem',
              borderRadius: '20px',
              color: '#00ffc8',
              fontSize: '0.9rem'
            }}>🔥 Trending</span>
          </div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            margin: '1.5rem 0 0.5rem',
            background: 'linear-gradient(to right, #ff6b6b, #ffd700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Book Your Telugu Movie Tickets
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#aaa', marginBottom: '1.5rem' }}>
            Experience the best of Tollywood in stunning quality
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ff6b6b' }}>100+</div>
              <div style={{ color: '#888', fontSize: '0.9rem' }}>Telugu Movies</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffd700' }}>8.0+</div>
              <div style={{ color: '#888', fontSize: '0.9rem' }}>Average Rating</div>
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#00ffc8' }}>50+</div>
              <div style={{ color: '#888', fontSize: '0.9rem' }}>Showtimes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Genre Filter Bar */}
      <div style={{
        display: 'flex',
        gap: '0.6rem',
        flexWrap: 'wrap',
        marginBottom: '2rem',
        justifyContent: 'center',
        padding: '0.5rem'
      }}>
        {allGenres.map(genre => (
          <button
            key={genre}
            onClick={() => setActiveFilter(genre)}
            style={{
              background: activeFilter === genre 
                ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' 
                : 'rgba(255, 255, 255, 0.05)',
              color: activeFilter === genre ? 'white' : '#888',
              border: activeFilter === genre ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
              padding: '0.5rem 1.5rem',
              borderRadius: '20px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={e => {
              if (activeFilter !== genre) {
                e.target.style.background = 'rgba(255, 107, 107, 0.1)'
                e.target.style.color = '#ff6b6b'
              }
            }}
            onMouseLeave={e => {
              if (activeFilter !== genre) {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                e.target.style.color = '#888'
              }
            }}
          >
            {genre === 'All' ? '🎯 All Movies' : genre}
            {activeFilter === genre && ' ✓'}
          </button>
        ))}
      </div>

      {/* Movie Count */}
      <div style={{
        textAlign: 'left',
        marginBottom: '1rem',
        color: '#888',
        fontSize: '0.9rem'
      }}>
        Showing {filteredMovies.length} movies {activeFilter !== 'All' && `in "${activeFilter}"`}
      </div>

      {/* Movie Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginTop: '1rem'
      }}>
        {filteredMovies.map(movie => (
          <div key={movie.id} onClick={() => handleMovieClick(movie)} style={{
            background: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
            borderRadius: '16px',
            padding: '1.5rem',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column'
          }} onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 107, 107, 0.15)'
            e.currentTarget.style.borderColor = 'rgba(255, 107, 107, 0.3)'
          }} onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'
          }}>
            {/* Movie Title & Rating */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: '#fff',
                flex: 1
              }}>{movie.title}</h3>
              <div style={{
                background: 'rgba(255, 107, 107, 0.9)',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                marginLeft: '0.5rem'
              }}>
                ⭐ {movie.rating}
              </div>
            </div>

            {/* Year & Language */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontSize: '0.7rem',
                background: 'rgba(255, 107, 107, 0.15)',
                color: '#ff6b6b',
                padding: '2px 10px',
                borderRadius: '10px'
              }}>{movie.language}</span>
              <span style={{
                fontSize: '0.7rem',
                background: 'rgba(255, 215, 0, 0.15)',
                color: '#ffd700',
                padding: '2px 10px',
                borderRadius: '10px'
              }}>{movie.year}</span>
              <span style={{
                fontSize: '0.7rem',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#888',
                padding: '2px 10px',
                borderRadius: '10px'
              }}>{movie.duration}</span>
            </div>

            {/* Description */}
            <p style={{
              fontSize: '0.85rem',
              color: '#888',
              lineHeight: '1.4',
              marginBottom: '0.8rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flex: 1
            }}>{movie.description}</p>

            {/* Genres */}
            <div style={{
              display: 'flex',
              gap: '0.3rem',
              flexWrap: 'wrap',
              marginBottom: '0.8rem'
            }}>
              {movie.genres.slice(0, 3).map((genre, idx) => (
                <span key={idx} style={{
                  fontSize: '0.65rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#aaa',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>{genre}</span>
              ))}
              {movie.genres.length > 3 && (
                <span style={{
                  fontSize: '0.65rem',
                  color: '#555'
                }}>+{movie.genres.length - 3}</span>
              )}
            </div>

            {/* Director & Cast Preview */}
            <div style={{
              fontSize: '0.7rem',
              color: '#555',
              marginBottom: '0.8rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: '0.5rem'
            }}>
              <div><span style={{ color: '#666' }}>Director:</span> {movie.director}</div>
              <div><span style={{ color: '#666' }}>Cast:</span> {movie.cast.slice(0, 3).join(', ')}</div>
            </div>

            {/* Book Button */}
            <button style={{
              width: '100%',
              padding: '0.7rem',
              fontSize: '0.9rem',
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginTop: 'auto'
            }} onMouseEnter={e => e.target.style.transform = 'scale(1.02)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'}>
              Book Now 🎫
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showBooking && selectedMovie && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }} onClick={() => setShowBooking(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'linear-gradient(145deg, #1a1a1a, #0d0d0d)',
            borderRadius: '20px',
            padding: '2rem',
            maxWidth: '550px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative'
          }}>
            <button onClick={() => setShowBooking(false)} style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              color: '#888',
              fontSize: '1.5rem',
              cursor: 'pointer',
              transition: '0.3s'
            }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#888'}>✕</button>
            
            {bookingConfirmed ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                <h2 style={{ color: '#ff6b6b' }}>Booking Confirmed!</h2>
                <p style={{ color: '#888' }}>Thank you for booking with CineBook</p>
                <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '0.5rem' }}>Enjoy the movie! 🍿</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                  <div style={{
                    width: '70px',
                    height: '90px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    {selectedMovie.title.charAt(0)}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '0.2rem' }}>{selectedMovie.title}</h2>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', color: '#ffd700' }}>⭐ {selectedMovie.rating}</span>
                      <span style={{ fontSize: '0.8rem', color: '#888' }}>• {selectedMovie.duration}</span>
                      <span style={{ fontSize: '0.8rem', color: '#ff6b6b' }}>• {selectedMovie.language}</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#555', marginTop: '0.2rem' }}>
                      Director: {selectedMovie.director}
                    </div>
                  </div>
                </div>
                
                {bookingStep === 1 && (
                  <>
                    <h3 style={{ fontSize: '1rem', color: '#888', marginBottom: '0.8rem' }}>Select Showtime</h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                      gap: '10px',
                      marginBottom: '1.5rem'
                    }}>
                      {showtimes.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          style={{
                            background: selectedTime === time ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' : 'rgba(255, 255, 255, 0.05)',
                            color: selectedTime === time ? 'white' : '#888',
                            border: selectedTime === time ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '10px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontSize: '0.85rem'
                          }}
                        >
                          {time}
                        </button>
                      ))}
                    </div>

                    <h3 style={{ fontSize: '1rem', color: '#888', margin: '1rem 0 0.8rem' }}>Select Seats</h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(8, 1fr)',
                      gap: '6px',
                      marginBottom: '1rem'
                    }}>
                      {seats.map(seat => {
                        const isBooked = bookedSeats.includes(seat)
                        const isSelected = selectedSeats.includes(seat)
                        return (
                          <button
                            key={seat}
                            onClick={() => toggleSeat(seat)}
                            disabled={isBooked}
                            style={{
                              padding: '8px 0',
                              borderRadius: '6px 6px 0 0',
                              border: 'none',
                              cursor: isBooked ? 'not-allowed' : 'pointer',
                              transition: 'all 0.2s ease',
                              fontSize: '0.65rem',
                              background: isBooked ? '#111' : isSelected ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' : 'rgba(255, 255, 255, 0.05)',
                              color: isBooked ? '#444' : isSelected ? 'white' : '#666',
                              boxShadow: isSelected ? '0 0 20px rgba(255, 107, 107, 0.3)' : 'none'
                            }}
                          >
                            {seat}
                          </button>
                        )
                      })}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1rem 0' }}>
                      <span style={{ color: '#888', fontSize: '0.8rem' }}>🟢 Available</span>
                      <span style={{ color: '#888', fontSize: '0.8rem' }}>🔴 Selected</span>
                      <span style={{ color: '#888', fontSize: '0.8rem' }}>⚫ Booked</span>
                    </div>

                    {selectedSeats.length > 0 && (
                      <div style={{ 
                        margin: '1rem 0', 
                        color: '#ff6b6b',
                        background: 'rgba(255, 107, 107, 0.1)',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}>
                        Selected: {selectedSeats.join(', ')} ({selectedSeats.length} seats)
                      </div>
                    )}

                    <button onClick={handleBooking} style={{
                      width: '100%',
                      padding: '0.8rem',
                      background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                      border: 'none',
                      borderRadius: '10px',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: '0.3s'
                    }}>
                      Continue to Details →
                    </button>
                  </>
                )}

                {bookingStep === 2 && (
                  <>
                    <h3 style={{ fontSize: '1rem', color: '#888', marginBottom: '1rem' }}>
                      Enter Your Details
                    </h3>
                    <form onSubmit={handleConfirm}>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          color: 'white',
                          marginBottom: '1rem',
                          transition: 'border-color 0.3s ease',
                          outline: 'none'
                        }}
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          color: 'white',
                          marginBottom: '1rem',
                          transition: 'border-color 0.3s ease',
                          outline: 'none'
                        }}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          color: 'white',
                          marginBottom: '1rem',
                          transition: 'border-color 0.3s ease',
                          outline: 'none'
                        }}
                      />
                      
                      <div style={{ 
                        background: 'rgba(255, 255, 255, 0.05)', 
                        padding: '1rem', 
                        borderRadius: '10px',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                            <span>Movie:</span>
                            <span style={{ color: '#fff' }}>{selectedMovie.title}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                            <span>Showtime:</span>
                            <span style={{ color: '#ff6b6b' }}>{selectedTime}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                            <span>Seats:</span>
                            <span style={{ color: '#ffd700' }}>{selectedSeats.join(', ')}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <span style={{ fontSize: '1rem' }}>Total:</span>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff6b6b' }}>
                              ₹{selectedSeats.length * 250}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button 
                          type="button" 
                          onClick={() => setBookingStep(1)}
                          style={{
                            flex: 1,
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#888',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '0.8rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            transition: '0.3s'
                          }}
                        >
                          Back
                        </button>
                        <button type="submit" style={{
                          flex: 2,
                          padding: '0.8rem',
                          background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                          border: 'none',
                          borderRadius: '10px',
                          color: 'white',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: '0.3s'
                        }}>
                          Confirm Booking ✅
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
