import { BlogPost, BlogCategory, BlogAuthor } from '@/types/blog';

export const blogAuthors: BlogAuthor[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Pediatric nurse and mother of two, passionate about baby health and wellness.',
    social: {
      twitter: '@sarahjohnson',
      instagram: '@sarahjohnsonmom'
    }
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Board-certified pediatrician with 15 years of experience in child development.',
    social: {
      linkedin: 'michael-chen-md'
    }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Child development specialist and early education expert.',
    social: {
      instagram: '@emilyrodriguez'
    }
  }
];

export const blogCategories: BlogCategory[] = [
  { id: '1', name: 'Baby Care', slug: 'baby-care', description: 'Tips and advice for daily baby care routines', color: '#10b981' },
  { id: '2', name: 'Development', slug: 'development', description: 'Milestones and developmental stages', color: '#3b82f6' },
  { id: '3', name: 'Nutrition', slug: 'nutrition', description: 'Feeding guides and nutritional advice', color: '#f59e0b' },
  { id: '4', name: 'Sleep', slug: 'sleep', description: 'Sleep training and bedtime routines', color: '#8b5cf6' },
  { id: '5', name: 'Safety', slug: 'safety', description: 'Home safety and childproofing tips', color: '#ef4444' },
  { id: '6', name: 'Parenting', slug: 'parenting', description: 'Parenting strategies and support', color: '#ec4899' }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Essential Tips for New Parents: Your First Month Guide',
    slug: 'essential-tips-new-parents-first-month',
    excerpt: 'Navigate the overwhelming first month of parenthood with confidence using these tried-and-true tips from experienced parents and pediatricians.',
    content: `# 10 Essential Tips for New Parents: Your First Month Guide

Welcome to parenthood! The first month with your newborn is both magical and challenging. As you embark on this incredible journey, here are ten essential tips to help you navigate these early days with confidence.

## 1. Establish a Feeding Routine

Whether you're breastfeeding or formula-feeding, establishing a consistent routine is crucial. Newborns typically need to eat every 2-3 hours, which means 8-12 feedings per 24-hour period.

**Key Points:**
- Watch for hunger cues: rooting, sucking on hands, lip smacking
- Keep track of feeding times and amounts
- Don't worry too much about schedules in the first few weeks
- Stay hydrated and well-nourished yourself

## 2. Master the Art of Swaddling

Swaddling helps your baby feel secure and can improve sleep duration. Use a lightweight, breathable blanket and ensure the hips have room to move.

**Swaddling Steps:**
1. Lay blanket in a diamond shape
2. Fold top corner down
3. Place baby on their back
4. Wrap right side over and tuck
5. Fold bottom up
6. Wrap left side over and secure

## 3. Understand Sleep Patterns

Newborns sleep 16-18 hours per day, but in short bursts. This is normal! Create a sleep-friendly environment and learn to recognize tired signs.

**Sleep Tips:**
- Keep the room dark and quiet
- Use white noise if helpful
- Follow safe sleep guidelines (back to sleep)
- Accept that sleep will be fragmented initially

## 4. Diapering 101

You'll change 6-10 diapers daily. Master this essential skill quickly to keep your baby comfortable and prevent diaper rash.

**Diapering Essentials:**
- Have supplies ready before you start
- Clean thoroughly with each change
- Apply barrier cream as needed
- Check for proper fit to prevent leaks

## 5. Bathing Basics

Sponge baths are recommended until the umbilical cord falls off. Keep baths short (3-5 minutes) and warm (98-100°F).

**Bath Safety:**
- Never leave baby unattended
- Test water temperature with your elbow
- Use gentle, baby-safe products
- Keep everything within reach

## 6. Soothing Techniques

Every baby is different, but these techniques often help calm fussy babies:

**The 5 S's:**
1. Swaddle
2. Side or stomach position (for calming, not sleep)
3. Shush
4. Swing
5. Suck

## 7. Bonding Activities

Strong attachment forms through daily interactions:

**Bonding Ideas:**
- Skin-to-skin contact
- Talk and sing to your baby
- Make eye contact during feeding
- Practice baby massage

## 8. Recognize Illness Signs

Know when to call the doctor:

**Warning Signs:**
- Fever (100.4°F or higher)
- Difficulty breathing
- Poor feeding
- Excessive sleepiness or irritability
- Dehydration signs

## 9. Take Care of Yourself

Parental well-being is crucial for baby care:

**Self-Care Tips:**
- Sleep when the baby sleeps
- Accept help from others
- Stay connected with your partner
- Join a new parent support group

## 10. Build Your Support Network

You don't have to do this alone:

**Support Resources:**
- Family and friends
- Parenting groups
- Online communities
- Professional help when needed

## Final Thoughts

Remember that every parent and baby is unique. Trust your instincts, don't compare yourself to others, and know that it's okay to feel overwhelmed sometimes. You're doing great!

*This guide is meant to provide general advice. Always consult with your pediatrician for specific medical concerns about your baby.*`,
    author: blogAuthors[0],
    publishDate: '2024-01-15',
    readTime: 8,
    category: 'Baby Care',
    tags: ['newborn', 'first-month', 'parenting-tips', 'baby-care'],
    featuredImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop'
    ],
    relatedProducts: ['swaddle-blankets', 'baby-diapers', 'baby-wipes', 'baby-lotion']
  },
  {
    id: '2',
    title: 'Baby Sleep Training: A Gentle Approach to Better Nights',
    slug: 'baby-sleep-training-gentle-approach',
    excerpt: 'Discover gentle, evidence-based sleep training methods that respect your baby\'s needs while helping everyone get more rest.',
    content: `# Baby Sleep Training: A Gentle Approach to Better Nights

Sleep training doesn't have to mean tears and stress. Learn gentle approaches that help your baby develop healthy sleep habits while maintaining a strong parent-child bond.

## When to Start Sleep Training

Most babies are ready for sleep training between 4-6 months, when they:
- Can go longer stretches without feeding
- Have developed circadian rhythms
- Show signs of self-soothing

## Gentle Sleep Training Methods

### 1. The Fade-Out Method

Gradually reduce your involvement in helping baby fall asleep:

**Week 1:** Rock until drowsy, then place in crib
**Week 2:** Rock less, hold until drowsy
**Week 3:** Just hold and pat
**Week 4:** Place in crib awake but calm

### 2. The Chair Method

Stay near your baby while gradually moving away:

- Start beside the crib
- Move to middle of room
- Move to doorway
- Finally, leave room

### 3. Pick-Up/Put-Down Method

Respond to cries by picking up, calming, and putting back down when calm.

## Creating the Right Environment

**Optimal Sleep Conditions:**
- Dark room (blackout curtains)
- White noise machine
- Cool temperature (68-72°F)
- Consistent bedtime routine

## Sample Bedtime Routine

1. **6:30 PM** - Last feeding
2. **6:45 PM** - Bath time
3. **7:00 PM** - Massage and pajamas
4. **7:10 PM** - Story time
5. **7:20 PM** - Cuddles and songs
6. **7:30 PM** - In crib, lights out

## Common Challenges and Solutions

### Challenge: Early Morning Wakeups
**Solution:** Keep room dark, use white noise, avoid stimulation before 6 AM

### Challenge: Nap Resistance
**Solution:** Follow wake windows, create consistent nap routine

### Challenge: Regression Periods
**Solution:** Stay consistent, offer extra comfort, know it's temporary

## What to Expect

**Timeline:**
- Week 1-2: Lots of reassurance needed
- Week 3-4: Some improvement, still needs support
- Week 5-6: More independent sleep
- Week 7+: Consolidated sleep patterns

## Red Flags to Watch For

Consult your pediatrician if you notice:
- Difficulty breathing during sleep
- Excessive night sweating
- Persistent night terrors
- Failure to gain weight

## Success Tips

1. **Be Consistent** - Same routine every night
2. **Stay Calm** - Babies pick up on parental stress
3. **Track Progress** - Keep a sleep log
4. **Support Each Other** - Take turns with your partner
5. **Celebrate Small Wins** - Every improvement counts

## Alternative Approaches

If traditional sleep training isn't working, consider:
- Co-sleeping safely
- Bed-sharing following guidelines
- Waiting until baby is older
- Consulting a sleep consultant

## Final Thoughts

Sleep training is a journey, not a race. Choose the method that feels right for your family and be patient with the process. Remember that this phase will pass, and you'll all get through it together.

*Always consult with your pediatrician before starting any sleep training program, especially if your baby has health concerns.*`,
    author: blogAuthors[1],
    publishDate: '2024-01-10',
    readTime: 12,
    category: 'Sleep',
    tags: ['sleep-training', 'gentle-parenting', 'baby-sleep', 'bedtime-routine'],
    featuredImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544777266-05df5290df8c?w=800&h=400&fit=crop'
    ],
    relatedProducts: ['white-noise-machine', 'blackout-curtains', 'baby-monitor', 'sleep-sack']
  },
  {
    id: '3',
    title: 'Starting Solids: A Complete Guide to Baby\'s First Foods',
    slug: 'starting-solids-baby-first-foods-guide',
    excerpt: 'Everything you need to know about introducing solid foods to your baby, from timing and readiness signs to favorite first foods and recipes.',
    content: `# Starting Solids: A Complete Guide to Baby's First Foods

The journey into solid foods is an exciting milestone for both you and your baby. This comprehensive guide will help you navigate this transition with confidence and joy.

## Signs of Readiness

Most babies are ready for solids between 4-6 months when they show these signs:

**Physical Readiness:**
- Can sit with minimal support
- Has good head control
- Shows interest in your food
- Opens mouth when food approaches
- Has lost the tongue-thrust reflex

## Getting Started: The Essentials

**Equipment You'll Need:**
- High chair (or safe seating)
- Soft-tipped spoons
- Bibs and splat mat
- Small bowls
- Sippy cup for water

**First Foods to Try:**
- Single-grain rice cereal
- Pureed sweet potatoes
- Mashed bananas
- Avocado puree
- Pureed pears

## The 3-Day Wait Rule

Introduce one new food at a time and wait 3 days before trying another. This helps:
- Identify potential allergies
- Monitor digestive reactions
- Track food preferences

## Sample First Week Schedule

**Day 1-3:** Rice cereal (1 tablespoon mixed with breastmilk/formula)
**Day 4-6:** Sweet potato puree (1-2 tablespoons)
**Day 7-9:** Banana puree (1-2 tablespoons)

## Food Categories and Introduction Order

### Stage 1 (4-6 months): Pureed single foods
- Cereals (rice, oatmeal)
- Vegetables (sweet potato, carrots, peas)
- Fruits (banana, avocado, pears, apples)

### Stage 2 (6-8 months): Combination and textures
- Mixed vegetable purees
- Fruit and veggie combinations
- Soft mashed foods
- Finger foods (puffs, soft fruits)

### Stage 3 (8-12 months): Chunkier textures
- Small pieces of table food
- Self-feeding practice
- More complex flavors
- Family foods (modified)

## Baby-Led Weaning Approach

An alternative to purees that allows babies to self-feed:

**Benefits:**
- Develops motor skills
- Encourages independence
- Exposes to textures early
- Family meal participation

**Getting Started:**
- Offer appropriate finger foods
- Never leave baby unattended
- Start with soft, manageable pieces
- Accept that it will be messy!

## Common Concerns and Solutions

### Choking vs. Gagging
**Gagging:** Normal learning response, baby handles it
**Choking:** Silent, unable to breathe, requires intervention

**Learn infant CPR** before starting solids!

### Allergy Prevention
- Introduce allergens early (per current guidelines)
- Start with small amounts
- Watch for reactions (hives, swelling, breathing issues)
- Consult pediatrician about family history

### Constipation
- Offer water in a sippy cup
- Include high-fiber foods (pears, prunes)
- Ensure adequate movement
- Contact pediatrician if severe

## Sample Meal Plans

### 6-Month-Old Sample Day
**7 AM:** Breastmilk/formula
**9 AM:** 2 tablespoons rice cereal
**12 PM:** Breastmilk/formula
**3 PM:** 2 tablespoons sweet potato puree
**6 PM:** Breastmilk/formula
**8 PM:** Breastmilk/formula

### 9-Month-Old Sample Day
**7 AM:** Breastmilk/formula + toast strips
**9 AM:** Scrambled egg yolk pieces
**12 PM:** Soft-cooked vegetables
**3 PM:** Yogurt with berries
**6 PM:** Small pieces of family dinner
**8 PM:** Breastmilk/formula

## Foods to Avoid (Under 1 Year)

**Choking Hazards:**
- Whole nuts
- Whole grapes
- Hard candy
- Popcorn

**Allergy/Health Risks:**
- Honey (botulism risk)
- Cow's milk as main drink
- Excessive juice
- High-mercury fish
- Unpasteurized foods

## Making Your Own Baby Food

**Benefits:**
- Cost-effective
- Control over ingredients
- Fresh and nutritious
- Customizable textures

**Simple Methods:**
- Steaming and pureeing
- Mashing with fork
- Using baby food maker
- Freezing in ice cube trays

## Favorite Recipes

### Sweet Potato and Apple Puree
- 1 sweet potato, baked
- 1 apple, steamed
- Breastmilk or water to thin
- Cinnamon (optional)

### Avocado Banana Mash
- 1/2 ripe avocado
- 1/2 banana
- Breastmilk to desired consistency

### Vegetable Medley
- Steamed carrots, peas, and green beans
- Vegetable broth or water
- Mild herbs (optional)

## Tips for Success

1. **Follow Baby's Lead** - Respect hunger and fullness cues
2. **Stay Positive** - Your attitude affects baby's experience
3. **Be Patient** - Some foods take multiple tries
4. **Keep it Fun** - Make mealtimes enjoyable
5. **Trust Your Instincts** - You know your baby best

## When to Consult Your Pediatrician

Seek guidance if you notice:
- Failure to gain weight
- Extreme food refusal
- Allergic reactions
- Digestive issues
- Concerns about development

## Final Thoughts

Starting solids is about exploration and learning, not just nutrition. Keep it relaxed, follow your baby's lead, and enjoy watching them discover new tastes and textures.

*This guide provides general recommendations. Always consult with your pediatrician for personalized advice about your baby's nutritional needs.*`,
    author: blogAuthors[2],
    publishDate: '2024-01-05',
    readTime: 15,
    category: 'Nutrition',
    tags: ['solid-foods', 'baby-nutrition', 'first-foods', 'feeding-guide'],
    featuredImage: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=400&fit=crop'
    ],
    relatedProducts: ['baby-food-maker', 'high-chair', 'baby-spoons', 'sippy-cups']
  },
  {
    id: '4',
    title: 'Developmental Milestones: What to Expect in Baby\'s First Year',
    slug: 'developmental-milestones-first-year',
    excerpt: 'Track your baby\'s amazing development with this comprehensive guide to physical, cognitive, and social milestones in the first 12 months.',
    content: `# Developmental Milestones: What to Expect in Baby's First Year

Your baby's first year is filled with incredible growth and development. Understanding typical milestones helps you support their journey and know what to expect.

## Understanding Developmental Milestones

**Remember:** Every baby develops at their own pace. These milestones are general guidelines, not strict schedules.

**Areas of Development:**
- **Physical:** Motor skills, movement, coordination
- **Cognitive:** Thinking, learning, problem-solving
- **Language:** Communication, understanding, expression
- **Social-Emotional:** Relationships, emotions, self-awareness

## Month by Month Guide

### 0-2 Months: The Fourth Trimester

**Physical Milestones:**
- Lifts head briefly during tummy time
- Holds head up when supported
- Brings hands toward mouth
- Makes jerky, uncontrolled movements

**Cognitive Milestones:**
- Focuses on faces 8-12 inches away
- Recognizes familiar faces and voices
- Shows interest in complex patterns
- Begins to track objects with eyes

**Social Milestones:**
- Responds to touch and voice
- Begins to smile socially
- Calms when picked up
- Shows preference for familiar caregivers

### 3-4 Months: Becoming More Interactive

**Physical Milestones:**
- Holds head steady without support
- Pushes up on arms during tummy time
- Brings hands to mouth
- Grasps and shakes toys
- Rolls from tummy to back

**Cognitive Milestones:**
- Reaches for toys
- Follows objects with eyes
- Shows curiosity and exploration
- Recognizes familiar objects

**Language Milestones:**
- Coos and makes vowel sounds
- Laughs out loud
- Babbles with expression
- Turns head toward sounds

### 5-6 Months: Sitting and Exploring

**Physical Milestones:**
- Sits without support
- Rolls both ways (tummy to back, back to tummy)
- Supports weight on legs when standing
- Transfers objects between hands
- Rakes objects toward self

**Cognitive Milestones:**
- Looks around when hearing sounds
- Shows curiosity about hidden objects
- Explores objects by mouthing
- Begins to understand cause and effect

**Social Milestones:**
- Recognizes own name
- Shows stranger anxiety
- Enjoys social play
- Responds to other people's emotions

### 7-9 Months: Mobile and Curious

**Physical Milestones:**
- Crawls (may be commando style or on hands and knees)
- Sits without support
- Pulls to stand
- Uses thumb and finger to pick up items
- Moves objects from one hand to another

**Cognitive Milestones:**
- Understands object permanence
- Finds partially hidden objects
- Plays peek-a-boo
- Looks for dropped objects

**Language Milestones:**
- Says "mama" and "dada" nonspecifically
- Uses gestures like waving bye-bye
- Responds to own name
- Babbles chains of consonants

### 10-12 Months: Almost Toddler

**Physical Milestones:**
- Stands alone
- Takes first steps
- Climbs up onto furniture
- Throws objects
- Helps turn pages in books

**Cognitive Milestones:**
- Follows simple instructions
- Explores objects in different ways
- Uses objects correctly (cup, phone)
- Looks for hidden objects

**Language Milestones:**
- Says "mama" and "dada" specifically
- Uses one or two words besides mama/dada
- Responds to simple commands
- Tries to imitate words

## Red Flags: When to Consult Your Pediatrician

Contact your doctor if you notice:
- No smiles by 2 months
- No babbling by 6 months
- No sitting by 9 months
- No standing by 12 months
- Loss of previously acquired skills
- Extreme delays in any area

## Supporting Your Baby's Development

### Encourage Physical Development
- Daily tummy time
- Safe exploration space
- Age-appropriate toys
- Movement opportunities

### Foster Cognitive Growth
- Talk and read daily
- Provide varied experiences
- Allow safe exploration
- Play simple games

### Promote Language Skills
- Narrate daily activities
- Respond to coos and babbles
- Use gestures and expressions
- Read books together

### Support Social-Emotional Development
- Respond consistently to needs
- Provide comfort and security
- Allow social interaction
- Model positive emotions

## Play Ideas by Age

### 0-3 Months
- High-contrast images
- Gentle movement songs
- Face-to-face interaction
- Tummy time on mirror

### 4-6 Months
- Texture exploration
- Simple cause-effect toys
- Sitting practice
- Object permanence games

### 7-9 Months
- Crawling obstacle courses
- Stacking and nesting toys
- Simple puzzles
- Mirror play

### 10-12 Months
- Push toys
- Simple sorting games
- Pretend play
- Walking practice

## The Role of Screen Time

**Recommendations:**
- No screen time under 18-24 months
- Face-to-face interaction is crucial
- Background TV should be avoided
- Focus on interactive play instead

## Creating a Developmentally Supportive Environment

**Key Elements:**
- Safe space for movement
- Age-appropriate toys and materials
- Responsive caregiving
- Predictable routines
- Rich language exposure

## Celebrating Individual Development

**Every Baby is Unique:**
- Development happens in spurts
- Skills may appear out of order
- Personality affects development
- Cultural factors influence milestones

## Tracking Development

**What to Record:**
- First smile, laugh, roll
- New sounds and words
- Motor skill achievements
- Social interactions
- Problem-solving attempts

## When Not to Worry

**Normal Variations:**
- Some babies skip crawling
- Teeth appear at different times
- Growth patterns vary
- Personality affects skill demonstration

## Final Thoughts

Watching your baby develop is one of parenthood's greatest joys. Remember that you're your baby's most important teacher and that your responsive, loving care is the foundation for healthy development.

Trust your instincts, celebrate progress, and don't hesitate to reach out to your pediatrician with concerns. You're doing an amazing job supporting your baby's growth!

*This guide provides general developmental information. Always consult with your pediatrician about your baby's specific developmental needs.*`,
    author: blogAuthors[1],
    publishDate: '2023-12-28',
    readTime: 18,
    category: 'Development',
    tags: ['milestones', 'baby-development', 'first-year', 'developmental-stages'],
    featuredImage: 'https://images.unsplash.com/photo-1516726817505-f5db8d09efdf?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516726817505-f5db8d09efdf?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop'
    ],
    relatedProducts: ['developmental-toys', 'activity-mat', 'baby-books', 'milestone-cards']
  },
  {
    id: '5',
    title: 'Baby-Proofing Your Home: A Complete Safety Checklist',
    slug: 'baby-proofing-home-safety-checklist',
    excerpt: 'Create a safe environment for your growing baby with this comprehensive room-by-room baby-proofing guide and safety checklist.',
    content: `# Baby-Proofing Your Home: A Complete Safety Checklist

As your baby becomes more mobile, creating a safe home environment becomes crucial. This comprehensive guide will help you identify and address potential hazards in every room.

## When to Start Baby-Proofing

**Timeline:**
- **3-4 months:** Start planning and basic preparations
- **5-6 months:** Complete baby-proofing before crawling begins
- **6-9 months:** Regular safety checks as mobility increases
- **9+ months:** Ongoing adjustments for walking and climbing

## Essential Safety Gear

**Must-Have Items:**
- Safety gates for stairs and doorways
- Outlet covers or plates
- Cabinet and drawer locks
- Corner and edge guards
- Door pinch guards
- Window safety devices
- Anti-tip furniture straps

## Room-by-Room Safety Guide

### Living Room

**Furniture Safety:**
- Secure heavy furniture to walls
- Cover sharp corners and edges
- Remove or secure unstable items
- Check for small parts that could be swallowed

**Electrical Safety:**
- Cover all unused outlets
- Secure loose cords and cables
- Use cord covers for exposed wiring
- Keep electronics out of reach

**Window and Door Safety:**
- Install window guards or stops
- Use door pinch guards
- Secure blind cords (strangulation hazard)
- Keep windows locked when not in use

**Floor Level:**
- Remove tripping hazards
- Secure rugs to prevent slipping
- Check for small objects on floor
- Ensure adequate lighting

### Kitchen

**Appliance Safety:**
- Use appliance locks
- Secure oven door
- Keep dishwasher closed and locked
- Unplug small appliances when not in use

**Cabinet and Drawer Safety:**
- Install safety locks on all lower cabinets
- Secure drawers containing sharp objects
- Move cleaning supplies to high cabinets
- Use stove knob covers

**Countertop Safety:**
- Push items back from edges
- Remove knives and sharp objects
- Keep hot liquids away from edges
- Secure heavy appliances

**Floor Safety:**
- Clean up spills immediately
- use non-slip rugs
- Remove tripping hazards
- Keep floor clear of clutter

### Nursery

**Crib Safety:**
- Firm mattress with tight-fitting sheet
- No loose bedding, pillows, or bumpers
- Slats no more than 2.375 inches apart
- No drop-side cribs
- Mattress at lowest position for standing babies

**Changing Table Safety:**
- Never leave baby unattended
- Use safety strap
- Keep supplies within reach but out of baby's reach
- Secure furniture to wall

**Window Safety:**
- Install window guards
- Keep blind cords out of reach
- Use cordless window coverings
- Ensure windows open less than 4 inches

**General Safety:**
- Remove mobiles when baby can reach them
- Secure bookshelves and dressers
- Check for small parts in toys
- Monitor room temperature

### Bathroom

**Water Safety:**
- Never leave baby unattended near water
- Set water heater to 120°F or lower
- Use toilet seat locks
- Empty tub immediately after use

**Medicine and Chemical Safety:**
- Lock medicine cabinet
- Store all medications out of reach
- Use child-resistant containers
- Keep cleaning products secured

**Electrical Safety:**
- Use ground fault circuit interrupters (GFCIs)
- Cover all outlets
- Keep electrical devices away from water
- Unplug appliances after use

**Slip and Fall Prevention:**
- Use non-slip mats in tub
- Clean up water spills immediately
- Keep floor dry
- Remove tripping hazards

### Bedrooms

**Furniture Safety:**
- Secure dressers and bookshelves
- Remove heavy items from high surfaces
- Use corner guards on sharp furniture
- Check for small parts

**Window Safety:**
- Install window guards
- Secure blind cords
- Use cordless window treatments
- Keep windows locked

**General Safety:**
- Remove small objects from floor
- Check under bed for hazards
- Secure electrical cords
- Maintain adequate lighting

### Stairs and Hallways

**Stair Safety:**
- Install safety gates at top and bottom
- Use hardware-mounted gates for stairs
- Ensure gate installation is secure
- Keep stairs clear of objects

**Lighting:**
- Ensure adequate lighting
- Use nightlights in hallways
- Replace burned-out bulbs promptly
- Keep light switches accessible

**General Safety:**
- Remove tripping hazards
- Secure loose carpets
- Check for uneven flooring
- Maintain clear pathways

## Outdoor Safety

**Yard Safety:**
- Fence in play areas
- Remove poisonous plants
- Secure pools and hot tubs
- Check for sharp objects

**Garage/Shed Safety:**
- Keep tools locked away
- Store chemicals securely
- Ensure proper ventilation
- Remove automotive fluids

**Playground Safety:**
- Check equipment for sharp edges
- Ensure proper surfacing
- Remove trip hazards
- Supervise play at all times

## Seasonal Safety Considerations

### Summer Safety
- Window safety (open windows)
- Pool and water safety
- Heat and sun protection
- Insect protection

### Winter Safety
- Heating safety
- Carbon monoxide detectors
- Slip and fall prevention
- Holiday decorations safety

### Holiday Safety
- Tree and decoration safety
- Gift wrapping hazards
- Food safety
- Visitor safety

## Car Safety Beyond the Car Seat

**Vehicle Safety:**
- Never leave child unattended in car
- Check for hidden dangers in car
- Secure loose objects
- Regular car seat checks

**Parking Lot Safety:**
- Hold hands in parking lots
- Teach traffic safety early
- Use crosswalks correctly
- Be aware of backing vehicles

## Emergency Preparedness

**Must-Have Information:**
- Emergency contacts posted visibly
- First aid kit accessible
- Fire extinguisher available
- Escape routes planned

**Important Numbers:**
- Poison control: 1-800-222-1222
- Pediatrician: ___________
- Emergency services: 911
- Local hospital: ___________

## Common Hazards You Might Miss

**Overlooked Dangers:**
- Houseplants (some are toxic)
- Pet food and water bowls
- Small batteries (especially button batteries)
- Magnets
- Plastic bags and wrap
- Cords and strings

**Hidden Risks:**
- Older paint (lead)
- Asbestos in older homes
- Radon gas
- Carbon monoxide
- Mold and mildew

## Creating a Safe Sleep Environment

**Safe Sleep Guidelines:**
- Firm, flat surface
- No loose bedding
- Room temperature comfortable
- No smoking around baby
- Back to sleep position

## Teaching Safety Early

**Age-Appropriate Safety Lessons:**
- "Hot" and "cold" concepts
- "Gentle" with pets
- "No touch" for dangerous items
- Basic traffic safety

## Regular Safety Checks

**Monthly Checklist:**
- Test smoke detectors
- Check gate security
- Inspect toys for damage
- Review emergency plans
- Update child-proofing as needed

**Quarterly Review:**
- Deep clean and reorganize
- Check furniture stability
- Update first aid supplies
- Review safety rules
- Adjust for developmental changes

## When to Call for Help

**Emergency Situations:**
- Choking or difficulty breathing
- Unconsciousness
- Severe bleeding
- Burns
- Poisoning

**Urgent but Not Emergency:**
- Minor injuries that don't heal
- Near-miss incidents
- Safety equipment failure
- New hazards identified

## Final Thoughts

Baby-proofing is an ongoing process that evolves with your child's development. What's safe today may need adjustment tomorrow. Stay vigilant, be proactive, and remember that supervision is always your most important safety tool.

Trust your instincts - if something doesn't feel safe, it probably isn't. Creating a secure environment allows your baby to explore and learn confidently while giving you peace of mind.

*This guide provides comprehensive safety information. Always consult with child safety experts or your pediatrician for specific concerns about your home environment.*`,
    author: blogAuthors[0],
    publishDate: '2023-12-20',
    readTime: 20,
    category: 'Safety',
    tags: ['baby-proofing', 'home-safety', 'child-safety', 'safety-checklist'],
    featuredImage: 'https://images.unsplash.com/photo-1571924693628-9e3a60ae8dbf?w=800&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1571924693628-9e3a60ae8dbf?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&h=400&fit=crop'
    ],
    relatedProducts: ['safety-gates', 'outlet-covers', 'cabinet-locks', 'corner-guards']
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getRelatedBlogPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
    .slice(0, limit);
};

export const getRecentBlogPosts = (limit: number = 5): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
};
