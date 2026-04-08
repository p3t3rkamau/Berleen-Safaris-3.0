import { motion } from 'motion/react';
import { Award, Users, Headphones, MapPin, Shield, Heart } from 'lucide-react';
import SEO from '../components/Seo';

const features = [
  {
    icon: Users,
    title: 'Experienced Guides',
    description: 'Our professional guides have years of experience and deep knowledge of East African wildlife, culture, and landscapes.'
  },
  {
    icon: Award,
    title: 'Affordable Packages',
    description: 'We offer the best value safaris without compromising on quality, tailored to fit various budgets and preferences.'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock assistance before, during, and after your safari ensures a worry-free adventure.'
  },
  {
    icon: MapPin,
    title: 'Custom Tours',
    description: 'Every safari is personalized to match your interests, schedule, and desired experiences across East Africa.'
  },
  {
    icon: Shield,
    title: 'Safety First',
    description: 'Your safety is our top priority with well-maintained vehicles, experienced drivers, and comprehensive insurance.'
  },
  {
    icon: Heart,
    title: 'Sustainable Tourism',
    description: 'We practice responsible tourism that benefits local communities and protects wildlife and natural habitats.'
  }
];

const team = [
  {
    name: 'Beth Nampaso',
    role: 'Founder & Lead Guide',
    image: '',
    bio: '15+ years of safari experience across East Africa'
  }
 
];

export function About() {
  return (
    <div>
      <SEO 
        title="About | Berleen Safaris"
        description="Learn about Berleen Safaris and our commitment to providing exceptional safari experiences in Kenya"
      />
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1738508041350-03453c14811c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWZhcmklMjBqZWVwJTIwYWZyaWNhfGVufDF8fHx8MTc3MjM1MDA5OXww&ixlib=rb-4.1.0&q=80&w=1080)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                About Berleen Safaris
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Creating unforgettable safari experiences since 2010
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-4">
                Berleen Safaris Ltd. was founded in 2010 with a simple mission: to share the incredible beauty 
                and wildlife of East Africa with travelers from around the world. What started as a small operation 
                with a single safari vehicle has grown into one of the region's most trusted safari companies.
              </p>
              <p className="mb-4">
                We specialize in personalized safari experiences across Kenya, Tanzania, Rwanda, and Uganda. Our team 
                of experienced guides and safari experts are passionate about wildlife conservation and sustainable 
                tourism. Every safari we organize is designed to create lasting memories while respecting the 
                environment and supporting local communities.
              </p>
              <p>
                Today, we're proud to have helped thousands of travelers experience the magic of African safaris, 
                from witnessing the Great Migration in the Serengeti to trekking with mountain gorillas in Rwanda. 
                Our commitment to excellence, safety, and customer satisfaction remains at the heart of everything we do.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--safari-gold)] to-[var(--safari-orange)] rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--safari-brown-dark)] mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To provide exceptional, authentic safari experiences that exceed our clients' expectations while 
                promoting wildlife conservation and supporting local communities throughout East Africa.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--safari-gold)] to-[var(--safari-orange)] rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--safari-brown-dark)] mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600">
                To be East Africa's leading safari company, recognized for delivering transformative travel 
                experiences that create lasting connections between people, wildlife, and nature.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Why Choose Berleen Safaris
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We go above and beyond to ensure your safari is unforgettable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[var(--safari-cream)] p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[var(--safari-gold)] to-[var(--safari-orange)] rounded-full mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet The Team */}
      <section className="py-20 px-4 bg-[var(--safari-cream)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate experts dedicated to creating your perfect safari
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--safari-brown-dark)] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[var(--safari-gold)] font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--safari-brown-dark)] mb-6">
              Certifications & Partnerships
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We are proud members of leading tourism organizations and hold all necessary 
              certifications to operate safaris across East Africa. Our partnerships with 
              conservation organizations ensure that your safari supports wildlife protection 
              and sustainable tourism initiatives.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-[var(--safari-gold)]">
              <div className="bg-[var(--safari-cream)] px-6 py-3 rounded-full font-semibold">
                Licensed Tour Operator
              </div>
              <div className="bg-[var(--safari-cream)] px-6 py-3 rounded-full font-semibold">
                Kenya Tourism Board
              </div>
              <div className="bg-[var(--safari-cream)] px-6 py-3 rounded-full font-semibold">
                Tanzania Tourism Board
              </div>
              <div className="bg-[var(--safari-cream)] px-6 py-3 rounded-full font-semibold">
                Wildlife Conservation Partner
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
