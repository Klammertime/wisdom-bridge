import { UserProfile, Connection } from './types'

export const mockUserProfiles: UserProfile[] = [
  {
    id: 'user-martha-wilson',
    email: 'martha.wilson@example.com',
    name: 'Martha Wilson',
    role: 'giver',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Martha&backgroundColor=b6e3f4',
    headline: 'Retired Detective • True Crime Enthusiast • Grandmother of 5',
    location: 'Chicago, IL',
    expertise: ['Criminal Investigation', 'Cold Cases', 'Forensics', 'Community Policing'],
    interests: ['True Crime Podcasts', 'Gardening', 'Mystery Novels', 'Cooking', 'Grandchildren'],
    bio: 'After 35 years in law enforcement, I have countless stories to share. From solving cold cases to community policing initiatives, I love discussing the human side of detective work. Now I spend my days gardening and spoiling my grandkids!',
    favoriteStory: 'Solved a 20-year cold case with a single fingerprint found on a library book',
    languages: ['English', 'Spanish'],
    availability: 'Weekday mornings and weekend afternoons',
    yearsOfExperience: 35
  },
  {
    id: 'user-robert-chen',
    email: 'robert.chen@example.com',
    name: 'Robert Chen',
    role: 'giver',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert&backgroundColor=c0aede',
    headline: 'WWII Veteran • History Professor • Storyteller',
    location: 'San Francisco, CA',
    expertise: ['WWII History', 'Pacific Theater', 'Military Strategy', 'Teaching'],
    interests: ['Documentary Films', 'Chess', 'Classical Music', 'Writing Memoirs'],
    bio: 'I served in the Pacific Theater during WWII and later became a history professor. I believe in preserving stories for future generations. Love sharing experiences about resilience, leadership, and how history shapes our present.',
    favoriteStory: 'Liberation of a POW camp in the Philippines - the joy in those soldiers\' eyes',
    languages: ['English', 'Mandarin', 'Japanese'],
    availability: 'Most evenings after 6 PM PST',
    yearsOfExperience: 45
  },
  {
    id: 'user-sarah-martinez',
    email: 'sarah.martinez@example.com',
    name: 'Sarah Martinez',
    role: 'receiver',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ffd5dc',
    headline: 'Aspiring Journalist • True Crime Blogger • Story Seeker',
    location: 'Austin, TX',
    expertise: ['Digital Journalism', 'Podcasting', 'Social Media'],
    interests: ['True Crime', 'Cold Cases', 'Investigation Techniques', 'Photography'],
    bio: 'Working on a true crime podcast and always seeking authentic stories from those who lived them. Particularly interested in hearing from law enforcement professionals about cases that changed them.',
    lookingFor: 'Retired detectives or anyone with law enforcement stories to share',
    languages: ['English', 'Spanish'],
    availability: 'Flexible schedule - can adapt to your timezone'
  },
  {
    id: 'user-james-thompson',
    email: 'james.thompson@example.com',
    name: 'James Thompson',
    role: 'both',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James&backgroundColor=a8e6cf',
    headline: 'Small Business Owner • Mentor • Life-Long Learner',
    location: 'Denver, CO',
    expertise: ['Entrepreneurship', 'Restaurant Industry', 'Team Building', 'Finance'],
    interests: ['Cooking', 'Business Strategy', 'Mountain Hiking', 'Jazz Music'],
    bio: 'Built three successful restaurants from scratch. Love mentoring young entrepreneurs while also learning from older business veterans. There\'s always something new to discover from different generations.',
    favoriteStory: 'Starting my first restaurant with just $5,000 and a dream',
    lookingFor: 'Business wisdom from any generation',
    languages: ['English'],
    availability: 'Weekday afternoons between lunch and dinner rush',
    yearsOfExperience: 25
  },
  {
    id: 'user-elena-petrov',
    email: 'elena.petrov@example.com',
    name: 'Elena Petrov',
    role: 'giver',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=ffd3b6',
    headline: 'Retired Nurse • Immigrant Success Story • Community Volunteer',
    location: 'Boston, MA',
    expertise: ['Nursing', 'Healthcare', 'Immigration Experience', 'Community Building'],
    interests: ['Knitting', 'Folk Dancing', 'Cooking Traditional Recipes', 'Volunteering'],
    bio: 'Came to America 40 years ago with nothing but hope. Built a career in nursing, raised three successful children, and now volunteer at the hospital. Love sharing my journey and hearing others\' stories.',
    favoriteStory: 'My first day as a nurse in America - couldn\'t speak English but saved a life',
    languages: ['English', 'Russian', 'Ukrainian'],
    availability: 'Tuesday and Thursday mornings',
    yearsOfExperience: 38
  },
  {
    id: 'user-david-kim',
    email: 'david.kim@example.com',
    name: 'David Kim',
    role: 'receiver',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=ffdfba',
    headline: 'Software Developer • New Dad • Seeking Parenting Wisdom',
    location: 'Seattle, WA',
    expertise: ['Software Development', 'AI/ML', 'Startups'],
    interests: ['Technology', 'Parenting', 'Work-Life Balance', 'Photography', 'Coffee'],
    bio: 'First-time dad trying to balance a tech career with family life. Looking for wisdom from experienced parents, especially about maintaining relationships and finding purpose beyond work.',
    lookingFor: 'Parents who\'ve successfully balanced career and family',
    languages: ['English', 'Korean'],
    availability: 'Evenings after 8 PM PST (after bedtime!)'
  },
  {
    id: 'user-margaret-oconnor',
    email: 'margaret.oconnor@example.com',
    name: 'Margaret O\'Connor',
    role: 'giver',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Margaret&backgroundColor=b6e3f4',
    headline: 'Former Librarian • Poetry Lover • Widow Finding Purpose',
    location: 'Portland, ME',
    expertise: ['Literature', 'Research', 'Local History', 'Poetry'],
    interests: ['Book Clubs', 'Writing Poetry', 'Genealogy', 'Bird Watching', 'Tea'],
    bio: 'After losing my husband last year, I discovered the joy of sharing stories with younger generations. 40 years as a librarian gave me countless tales about the power of books and human connections.',
    favoriteStory: 'The teenager who discovered her passion through a book I recommended',
    languages: ['English', 'French'],
    availability: 'Most afternoons, prefer tea time conversations',
    yearsOfExperience: 40
  },
  {
    id: 'user-carlos-rivera',
    email: 'carlos.rivera@example.com',
    name: 'Carlos Rivera',
    role: 'both',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos&backgroundColor=c0aede',
    headline: 'High School Teacher • Coach • Community Leader',
    location: 'Phoenix, AZ',
    expertise: ['Education', 'Youth Mentoring', 'Baseball Coaching', 'Community Organizing'],
    interests: ['Sports', 'Education Reform', 'Cooking', 'Local Politics', 'Family'],
    bio: 'Teaching high school for 20 years has taught me as much as I\'ve taught others. Love connecting with both elder educators for wisdom and young people starting their careers.',
    favoriteStory: 'When my roughest student became a teacher himself',
    lookingFor: 'Retired teachers and young educators alike',
    languages: ['English', 'Spanish'],
    availability: 'Weekends and summer break',
    yearsOfExperience: 20
  }
]

export const mockConnections: Connection[] = [
  {
    id: 'conn-1',
    userId: 'current-user',
    connectedUserId: 'user-martha-wilson',
    connectedUserName: 'Martha Wilson',
    connectedUserEmail: 'martha.wilson@example.com',
    connectedUserImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Martha&backgroundColor=b6e3f4',
    connectedAt: new Date('2024-01-15'),
    notes: 'Amazing conversation about cold case techniques. She shared fascinating stories about forensic breakthroughs.',
  },
  {
    id: 'conn-2',
    userId: 'current-user',
    connectedUserId: 'user-robert-chen',
    connectedUserName: 'Robert Chen',
    connectedUserEmail: 'robert.chen@example.com',
    connectedUserImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert&backgroundColor=c0aede',
    connectedAt: new Date('2024-01-10'),
    notes: 'Incredible WWII stories. His perspective on leadership during crisis was invaluable.',
  },
  {
    id: 'conn-3',
    userId: 'current-user',
    connectedUserId: 'user-elena-petrov',
    connectedUserName: 'Elena Petrov',
    connectedUserEmail: 'elena.petrov@example.com',
    connectedUserImageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena&backgroundColor=ffd3b6',
    connectedAt: new Date('2024-01-05'),
    notes: 'Her immigration story was so inspiring. Learned about resilience and building community.',
  }
]

export const conversationStarters = [
  "What's a story from your life that you love to tell?",
  "What was the biggest challenge you overcame, and how did you do it?",
  "If you could give your younger self one piece of advice, what would it be?",
  "What's changed the most about the world since you were young?",
  "What tradition or skill do you wish more people knew about?",
  "Tell me about a person who had a major impact on your life.",
  "What's something you're proud of that most people don't know about?",
  "What was your neighborhood like when you were growing up?",
  "What's a lesson you learned the hard way?",
  "What makes you feel most connected to others?"
]

export const conversationTips = [
  {
    title: "Listen with curiosity",
    description: "Ask follow-up questions and show genuine interest in their experiences."
  },
  {
    title: "Share your own stories",
    description: "Conversations flow best when both people contribute. Don't be afraid to relate."
  },
  {
    title: "Be patient with pauses",
    description: "Sometimes people need a moment to gather their thoughts, especially with deeper topics."
  },
  {
    title: "Find common ground",
    description: "Look for shared experiences or values that connect across generations."
  },
  {
    title: "Express gratitude",
    description: "Let them know when something they've shared has impacted or helped you."
  }
]

export const successStories = [
  {
    title: "From Strangers to Weekly Calls",
    participants: "Sarah (28) & Martha (72)",
    story: "Sarah was researching for her true crime podcast when she connected with Martha, a retired detective. What started as a one-time interview became weekly calls where Martha shares case stories and life wisdom. 'She's like the grandmother I never had,' says Sarah. 'And she tells me I keep her young!'",
    outcome: "6 months of weekly conversations and counting"
  },
  {
    title: "Business Wisdom Across Generations",
    participants: "James (45) & George (78)",
    story: "Restaurant owner James was struggling with expansion decisions when he matched with George, who built a retail empire in the 1980s. George's old-school business principles helped James refocus on customer relationships over rapid growth. They now meet monthly to discuss business and life.",
    outcome: "Successful restaurant expansion with 40% increase in customer retention"
  },
  {
    title: "Finding Family After Loss",
    participants: "David (32) & Margaret (68)",
    story: "New father David lost his parents young and craved parental guidance. Margaret, a widow, missed having young people in her life. Their conversations about parenting, loss, and finding joy have enriched both their lives. 'We found the family we both needed,' Margaret shares.",
    outcome: "Regular video calls and holiday card exchanges"
  },
  {
    title: "Immigration Stories That Inspire",
    participants: "Ana (25) & Elena (65)",
    story: "College student Ana was struggling with her identity as a first-generation American when she connected with Elena, who immigrated 40 years ago. Elena's stories of building a life in America while maintaining cultural roots helped Ana embrace both parts of her identity.",
    outcome: "Ana started a cultural club at her university inspired by Elena's stories"
  }
]