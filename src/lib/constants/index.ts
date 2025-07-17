import { Template, Component } from "@/types";

export const templates: Template[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Complete landing page with hero, features, testimonials and CTA',
    components: [
      { 
        id: 'hero1', 
        type: 'hero', 
        title: 'Welcome to Our Platform', 
        subtitle: 'Transform your ideas into reality with our powerful tools', 
        buttonText: 'Get Started',
      },
      { 
        id: 'features1', 
        type: 'features',
        title: 'Why Choose Us',
        subtitle: 'Discover our key features and benefits',
        features: [
          { title: 'Easy to Use', description: 'Intuitive interface for all skill levels' },
          { title: 'Powerful Features', description: 'Everything you need to create amazing pages' },
          { title: 'Responsive Design', description: 'Looks great on any device' }
        ],
      },
      { 
        id: 'image1', 
        type: 'image', 
        alt: 'Demo image',
      },
      { 
        id: 'testimonials1', 
        type: 'testimonials',
        title: 'What Our Users Say',
        testimonials: [
          { name: 'Alex Johnson', role: 'Product Designer', content: 'This editor has transformed how I create landing pages.' },
          { name: 'Sarah Chen', role: 'Marketing Manager', content: 'The easiest page builder I have ever used.' },
          { name: 'Michael Brown', role: 'Startup Founder', content: 'Saved us countless hours of development time.' }
        ],
      },
      { 
        id: 'cta1', 
        type: 'button', 
        text: 'Start Building Now', 
      }
    ]
  },
  {
    id: 'product-showcase',
    name: 'Product Showcase',
    description: 'Highlight products with images and descriptions',
    components: [
      { 
        id: 'hero2', 
        type: 'hero', 
        title: 'Introducing Our New Product', 
        subtitle: 'Experience innovation at its finest', 
        buttonText: 'Learn More',
      },
      { 
        id: 'features2', 
        type: 'features',
        title: 'Product Features',
        subtitle: 'Everything you need in one product',
        features: [
          { title: 'High Performance', description: 'Engineered for maximum efficiency' },
          { title: 'Eco-Friendly', description: 'Sustainable design for the future' },
          { title: 'Smart Technology', description: 'AI-powered features for convenience' }
        ],
      },
      { 
        id: 'image2', 
        type: 'image', 
        alt: 'Product image',
      },
      { 
        id: 'testimonials2', 
        type: 'testimonials',
        title: 'Customer Reviews',
        testimonials: [
          { name: 'John Smith', role: 'Tech Enthusiast', content: 'This product exceeded all my expectations.' },
          { name: 'Emily Davis', role: 'Product Reviewer', content: 'The best in its category by far.' }
        ],
      }
    ]
  },
  {
    id: 'portfolio',
    name: 'Portfolio Layout',
    description: 'Showcase your work with gallery and project details',
    components: [
      { 
        id: 'hero3', 
        type: 'hero', 
        title: 'Our Creative Portfolio', 
        subtitle: 'Discover our latest projects and designs', 
        buttonText: 'View Projects',
      },
      { 
        id: 'image3', 
        type: 'image', 
        alt: 'Project 1',
      },
      { 
        id: 'text1', 
        type: 'text', 
        content: 'Project Alpha: A cutting-edge design solution that transformed our client\'s business.',
      },
      { 
        id: 'image4', 
        type: 'image', 
        alt: 'Project 2',
      },
      { 
        id: 'text2', 
        type: 'text', 
        content: 'Project Beta: Innovative approach to user experience and interface design.',
      },
      { 
        id: 'cta2', 
        type: 'button', 
        text: 'Contact Us', 
      }
    ]
  },
  {
    id: 'service-page',
    name: 'Service Page',
    description: 'Showcase services with descriptions and benefits',
    components: [
      { 
        id: 'hero4', 
        type: 'hero', 
        title: 'Premium Services', 
        subtitle: 'Expert solutions for your business needs', 
        buttonText: 'Get Started',
      },
      { 
        id: 'features3', 
        type: 'features',
        title: 'Our Services',
        subtitle: 'Comprehensive solutions for your success',
        features: [
          { title: 'Web Development', description: 'Custom websites and applications' },
          { title: 'UI/UX Design', description: 'User-centered interface design' },
          { title: 'Digital Marketing', description: 'Data-driven marketing strategies' }
        ],
      },
      { 
        id: 'testimonials3', 
        type: 'testimonials',
        title: 'Client Success Stories',
        testimonials: [
          { name: 'Robert Wilson', role: 'CEO', content: 'Their services helped us increase conversions by 200%.' },
          { name: 'Jennifer Lee', role: 'Marketing Director', content: 'Exceptional quality and attention to detail.' }
        ],
      },
      { 
        id: 'cta3', 
        type: 'button', 
        text: 'Schedule Consultation', 
      }
    ]
  },
  {
    id: 'blog-template',
    name: 'Blog Template',
    description: 'Clean layout for blog content with featured posts',
    components: [
      { 
        id: 'hero5', 
        type: 'hero', 
        title: 'Insights & Articles', 
        subtitle: 'Latest industry news and expert perspectives', 
        buttonText: 'Read More',
      },
      { 
        id: 'text3', 
        type: 'text', 
        content: 'Featured Post: The Future of Web Development in 2023',
      },
      { 
        id: 'image5', 
        type: 'image', 
        alt: 'Featured post image',
      },
      { 
        id: 'text4', 
        type: 'text', 
        content: 'How AI is transforming the design process and creating new opportunities for creatives.',
      },
      { 
        id: 'features4', 
        type: 'features',
        title: 'Popular Categories',
        subtitle: 'Explore our content by topic',
        features: [
          { title: 'Web Development', description: 'Latest frameworks and techniques' },
          { title: 'UI/UX Trends', description: 'Emerging design patterns' },
          { title: 'Business Strategy', description: 'Growing your digital presence' }
        ],
      }
    ]
  }
];