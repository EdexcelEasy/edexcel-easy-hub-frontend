export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-ial-physics-kinematics-made-easy",
    title: "Understanding IAL Physics: Kinematics Made Easy",
    excerpt: "Kinematics is an important topic in IAL Physics. Learn about physical quantities, units, base and derived quantities, and scalars and vectors.",
    category: "IAL Physics",
    date: "2026-02-13",
    readTime: "8 min read",
    content: `Kinematics is an important topic in IAL Physics. It is the study of motion without considering the forces that cause the motion. To understand kinematics properly, we must first understand physical quantities, units, base and derived quantities, and scalars and vectors.

## 1. Physical Quantities and Units

A physical quantity is something that can be measured.

**Examples:**
- Length
- Time
- Mass
- Speed
- Velocity

Every physical quantity has:
- A **numerical value**
- A **unit**

For example:
- 5 metres
- 10 seconds
- 3 kilograms

The standard system of units used in physics is the **SI system** (International System of Units).

## 2. Base Quantities

Base quantities are the most basic physical quantities. They cannot be defined in terms of other quantities.

Some important base quantities in IAL Physics:

| Base Quantity | SI Unit | Symbol |
|---|---|---|
| Length | metre | m |
| Mass | kilogram | kg |
| Time | second | s |
| Electric current | ampere | A |
| Temperature | kelvin | K |
| Amount of substance | mole | mol |
| Luminous intensity | candela | cd |

These are the foundation of all other quantities.

## 3. Derived Quantities

Derived quantities are made by combining base quantities using mathematical relationships.

**Examples:**

- **Speed** = distance ÷ time → Unit: m/s
- **Acceleration** = change in velocity ÷ time → Unit: m/s²
- **Force** = mass × acceleration → Unit: newton (N) → 1 N = 1 kg·m/s²

Derived quantities are very important in kinematics because motion involves speed, velocity, and acceleration.

## 4. Scalars and Vectors

In kinematics, physical quantities are divided into **scalars** and **vectors**.

### Scalars

Scalars have:
- **Magnitude** (size) only
- **No direction**

**Examples:**
- Distance
- Speed
- Time
- Mass

For example, "20 m/s" is speed. It does not tell us the direction.

### Vectors

Vectors have:
- **Magnitude**
- **Direction**

**Examples:**
- Displacement
- Velocity
- Acceleration
- Force

For example, "20 m/s north" is velocity because it includes direction.

Vectors are usually represented using arrows in diagrams.

## Why This Is Important in Kinematics

In IAL Physics kinematics, we study:
- Displacement
- Velocity
- Acceleration
- Motion graphs

To solve problems correctly:
- We must use **correct units**
- We must understand whether the quantity is **scalar or vector**
- We must **convert units** properly (e.g., km/h to m/s)

Understanding these basics makes solving motion equations much easier.

## Conclusion

Kinematics is the foundation of motion in IAL Physics. Before learning equations of motion, students must clearly understand:

- Physical quantities and SI units
- Base and derived quantities
- The difference between scalars and vectors

Once these concepts are clear, solving kinematics problems becomes simple and logical.`,
  },
];
