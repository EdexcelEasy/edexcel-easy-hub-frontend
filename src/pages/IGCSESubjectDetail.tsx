import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Subject specifications data
const subjectSpecs: Record<string, { name: string; topics: { unit: string; topics: string[] }[] }> = {
  chemistry: {
    name: "Chemistry",
    topics: [
      {
        unit: "Unit 1: Principles of Chemistry",
        topics: [
          "States of matter",
          "Atoms",
          "Atomic structure",
          "Relative formula masses and molar volumes of gases",
          "Chemical formulae and chemical equations",
          "Ionic compounds",
          "Covalent substances",
          "Metallic crystals",
          "Electrolysis",
        ],
      },
      {
        unit: "Unit 2: Inorganic Chemistry",
        topics: [
          "Group 1 elements – alkali metals",
          "Group 7 elements – halogens",
          "Gases in the atmosphere",
          "Reactivity series",
          "Extraction and uses of metals",
          "Tests for ions and gases",
        ],
      },
      {
        unit: "Unit 3: Physical Chemistry",
        topics: [
          "Energetics",
          "Rates of reaction",
          "Reversible reactions and equilibria",
        ],
      },
      {
        unit: "Unit 4: Organic Chemistry",
        topics: [
          "Introduction to organic chemistry",
          "Crude oil",
          "Alkanes",
          "Alkenes",
          "Alcohols",
          "Carboxylic acids",
          "Esters",
          "Synthetic polymers",
        ],
      },
    ],
  },
  physics: {
    name: "Physics",
    topics: [
      {
        unit: "Unit 1: Forces and Motion",
        topics: [
          "Movement and position",
          "Forces and shape",
          "Forces and movement",
          "Momentum",
        ],
      },
      {
        unit: "Unit 2: Electricity",
        topics: [
          "Mains electricity",
          "Energy and potential difference in circuits",
          "Electric charge",
        ],
      },
      {
        unit: "Unit 3: Waves",
        topics: [
          "Properties of waves",
          "The electromagnetic spectrum",
          "Light and sound",
        ],
      },
      {
        unit: "Unit 4: Energy Resources and Energy Transfers",
        topics: [
          "Energy transfers",
          "Work and power",
          "Energy resources and electricity generation",
        ],
      },
      {
        unit: "Unit 5: Solids, Liquids and Gases",
        topics: [
          "Density and pressure",
          "Change of state",
          "Ideal gas molecules",
        ],
      },
      {
        unit: "Unit 6: Magnetism and Electromagnetism",
        topics: [
          "Magnetism",
          "Electromagnetism",
          "Electromagnetic induction",
        ],
      },
      {
        unit: "Unit 7: Radioactivity and Particles",
        topics: [
          "Radioactivity",
          "Particles",
        ],
      },
      {
        unit: "Unit 8: Astrophysics",
        topics: [
          "Motion in the universe",
          "Stellar evolution",
          "Cosmology",
        ],
      },
    ],
  },
  ict: {
    name: "ICT",
    topics: [
      {
        unit: "Section 1: Digital Devices",
        topics: [
          "Digital devices",
          "Connectivity",
          "Operating online",
        ],
      },
      {
        unit: "Section 2: Connectivity",
        topics: [
          "Connecting computers",
          "Network security",
          "Transmitting data",
        ],
      },
      {
        unit: "Section 3: Operating Online",
        topics: [
          "Online services",
          "Online communication",
          "Online safety",
        ],
      },
      {
        unit: "Section 4: Online Goods and Services",
        topics: [
          "E-commerce",
          "Online banking",
          "Online entertainment",
        ],
      },
    ],
  },
  "computer-science": {
    name: "Computer Science",
    topics: [
      {
        unit: "Unit 1: Problem Solving",
        topics: [
          "Algorithms",
          "Decomposition",
          "Abstraction",
          "Flowcharts and pseudocode",
        ],
      },
      {
        unit: "Unit 2: Programming",
        topics: [
          "Data types",
          "Variables and constants",
          "Selection and iteration",
          "Arrays and data structures",
          "Procedures and functions",
        ],
      },
      {
        unit: "Unit 3: Data",
        topics: [
          "Binary and hexadecimal",
          "Data representation",
          "Data storage",
          "Compression",
        ],
      },
      {
        unit: "Unit 4: Computers",
        topics: [
          "Computer architecture",
          "CPU and memory",
          "Input and output devices",
          "Storage devices",
        ],
      },
      {
        unit: "Unit 5: Networks",
        topics: [
          "Network types",
          "Network protocols",
          "Network security",
          "The internet",
        ],
      },
    ],
  },
  "mathematics-a": {
    name: "Mathematics A",
    topics: [
      {
        unit: "Chapter 1: Algebra",
        topics: [
          "Linear equations and indices",
          "Quadratic equation",
          "Word problem",
          "Inequality",
          "Variation (direct & indirect)",
          "Changing subject",
          "Factor remainder theorem",
          "LCM HCF",
          "Factorization",
          "Simplification",
          "Evaluation",
          "Sequence",
          "Recurring values",
          "Compound interest & simple interest",
        ],
      },
      {
        unit: "Chapter 2: Kinematics",
        topics: [
          "Vertical motion",
          "Horizontal motion",
        ],
      },
      {
        unit: "Chapter 3: Arithmetic",
        topics: [
          "Ratio & percentage",
          "Speed, distance, time",
          "Unitary method",
          "Map scale",
        ],
      },
      {
        unit: "Chapter 4: Functions",
        topics: [
          "Evaluation",
          "Composite function",
          "Inverse function",
          "Solving equation",
          "Mixed",
        ],
      },
      {
        unit: "Chapter 5: Vectors",
        topics: [
          "Addition, subtraction",
          "Modulus, angle",
          "Parallel vector",
          "Equal vector",
          "Column vector",
          "Vector geometry",
        ],
      },
      {
        unit: "Chapter 6: Statistics",
        topics: [
          "Pie chart",
          "Histogram",
          "Mean, mode, median",
        ],
      },
      {
        unit: "Chapter 7: Sets",
        topics: [
          "Non-statement",
          "Shading",
          "Statement",
        ],
      },
      {
        unit: "Chapter 8: Probability",
        topics: [
          "One draw",
          "Not replaced",
          "Replaced",
          "Replaced (probability given)",
        ],
      },
      {
        unit: "Chapter 9: Trigonometry",
        topics: [
          "Two dimensions",
          "Bearing",
        ],
      },
      {
        unit: "Chapter 10: Geometry",
        topics: [
          "Circle",
          "Triangle / parallel lines",
          "Polygon, similarity, symmetry",
          "Construction locus",
        ],
      },
      {
        unit: "Chapter 11: Mensuration",
        topics: [
          "Sector",
          "Circle",
          "Trapezium",
          "Rhombus",
          "Parallelogram",
          "Triangle",
          "Rectangle shaded area",
          "Cone cylinder",
          "Sphere / hemisphere",
          "Prism",
          "Cuboid",
          "Pyramid",
        ],
      },
      {
        unit: "Chapter 12: Equation Graph",
        topics: [
          "Calculus",
          "Coordinate geometry",
          "Distance time graph",
          "Speed time graph",
          "Inequality graph",
          "Quadratic graph",
          "Cubic graph",
          "Other graph",
          "Translation and transformation",
        ],
      },
      {
        unit: "Chapter 13: Matrix",
        topics: [
          "Non-transformation (add, subtraction, multiplication)",
          "Determinant / inverse",
          "Transformation (diagram, mixed, triangle, quadrilateral, stretch)",
        ],
      },
    ],
  },
  "mathematics-b": {
    name: "Mathematics B",
    topics: [
      {
        unit: "Chapter 1: Algebra",
        topics: [
          "Linear equations and indices",
          "Quadratic equation",
          "Word problem",
          "Inequality",
          "Variation (direct & indirect)",
          "Changing subject",
          "Factor remainder theorem",
          "LCM HCF",
          "Factorization",
          "Simplification",
          "Evaluation",
          "Sequence",
        ],
      },
      {
        unit: "Chapter 2: Kinematics",
        topics: [
          "Vertical motion",
          "Horizontal motion",
        ],
      },
      {
        unit: "Chapter 3: Arithmetic",
        topics: [
          "Ratio & percentage",
          "Speed, distance, time",
          "Unitary method",
          "Map scale",
        ],
      },
      {
        unit: "Chapter 4: Functions",
        topics: [
          "Evaluation",
          "Composite function",
          "Inverse function",
          "Solving equation",
          "Mixed",
        ],
      },
      {
        unit: "Chapter 5: Vectors",
        topics: [
          "Addition, subtraction",
          "Modulus, angle",
          "Parallel vector",
          "Equal vector",
          "Column vector",
          "Vector geometry",
        ],
      },
      {
        unit: "Chapter 6: Statistics",
        topics: [
          "Pie chart",
          "Histogram",
          "Mean, mode, median",
        ],
      },
      {
        unit: "Chapter 7: Sets",
        topics: [
          "Non-statement",
          "Shading",
          "Statement",
        ],
      },
      {
        unit: "Chapter 8: Probability",
        topics: [
          "One draw",
          "Not replaced",
          "Replaced",
          "Replaced (probability given)",
        ],
      },
      {
        unit: "Chapter 9: Trigonometry",
        topics: [
          "Two dimensions",
          "Bearing",
        ],
      },
      {
        unit: "Chapter 10: Geometry",
        topics: [
          "Circle",
          "Triangle / parallel lines",
          "Polygon, similarity, symmetry",
          "Construction locus",
        ],
      },
      {
        unit: "Chapter 11: Mensuration",
        topics: [
          "Sector",
          "Circle",
          "Trapezium",
          "Rhombus",
          "Parallelogram",
          "Triangle",
          "Rectangle shaded area",
          "Cone cylinder",
          "Sphere / hemisphere",
          "Prism",
          "Cuboid",
          "Pyramid",
        ],
      },
      {
        unit: "Chapter 12: Equation Graph",
        topics: [
          "Calculus",
          "Coordinate geometry",
          "Distance time graph",
          "Speed time graph",
          "Inequality graph",
          "Quadratic graph",
          "Cubic graph",
          "Other graph",
        ],
      },
      {
        unit: "Chapter 13: Matrix",
        topics: [
          "Non-transformation (add, subtraction, multiplication)",
          "Determinant / inverse",
          "Transformation (diagram, mixed, triangle, quadrilateral, stretch)",
        ],
      },
    ],
  },
  "further-pure-mathematics": {
    name: "Further Pure Mathematics",
    topics: [
      {
        unit: "Chapter 1: Algebra",
        topics: [
          "Factor remainder theorem",
          "Inequality",
          "Simultaneous equations",
          "Function",
          "Changing subject",
          "Solving quadratic equations",
        ],
      },
      {
        unit: "Chapter 2: Logs",
        topics: [
          "Solving equations",
          "Simultaneous equations",
          "Evaluation",
          "In terms of",
          "Exponential",
          "Proof",
          "Mixed",
        ],
      },
      {
        unit: "Chapter 3: Calculus",
        topics: [
          "Differentiation",
          "Differentiation (proof)",
          "Application of differentiation",
          "Integration",
          "Integration boundary",
          "Application of integration (area, volume)",
        ],
      },
      {
        unit: "Chapter 4: AP/GP",
        topics: [
          "Arithmetic progression",
          "Geometric progression",
          "Sigma notation",
        ],
      },
      {
        unit: "Chapter 5: Quadratic Equations",
        topics: [
          "Nature of roots",
          "Alpha, beta",
          "Completing square",
        ],
      },
      {
        unit: "Chapter 6: Binomial Expansion",
        topics: [
          "N = positive integer",
          "N = negative integer",
          "N = unknown",
          "N = fraction",
          "N = integration",
          "N = differentiation",
          "N = calculus",
        ],
      },
      {
        unit: "Chapter 7: Trigonometry",
        topics: [
          "Sphere",
          "Pyramid",
          "Circle",
          "Others",
          "2D, 3D, trigonometric equations",
          "Bearing, sketching, elimination, proof",
          "Value of trigonometric ratios",
          "Trigonometric calculus",
        ],
      },
      {
        unit: "Chapter 8: Mensuration",
        topics: [
          "Rectangle",
          "Cuboid",
          "Cylinder",
          "Trapezium",
          "Circle / segment / center",
        ],
      },
      {
        unit: "Chapter 9: Coordinate Geometry",
        topics: [
          "Coordinate geometry",
          "Integration (area, volume)",
          "Inequality",
          "Trigonometry",
          "Differentiation",
          "Exponential",
          "Fraction",
          "Logs",
        ],
      },
      {
        unit: "Chapter 10: Equation Graph",
        topics: [
          "Sketching cubic graph",
          "Sketching quadratic graph",
          "Sketching fraction graph",
          "Sketching trigonometric graph",
          "Sketching exponential graph",
          "Sketching log graphs",
        ],
      },
      {
        unit: "Chapter 11: Vector",
        topics: [
          "(i, j)",
          "Geometry",
          "Constant",
          "Non-constant",
          "Area",
        ],
      },
      {
        unit: "Chapter 12: Kinematics",
        topics: [
          "Integration",
          "Differentiation",
          "Horizontal motion",
          "Vertical motion",
        ],
      },
    ],
  },
  biology: {
    name: "Biology",
    topics: [
      {
        unit: "Chapter 1: The Nature and Variety of Living Organisms",
        topics: [
          "(a) Characteristics of living organisms: nutrition, respiration, excretion, response to surroundings, movement, control of internal conditions, reproduction, growth and development",
          "(b) Variety of living organisms — Eukaryotes",
          "Plants: multicellular, chloroplasts (photosynthesis), cellulose cell walls, store starch/sucrose (e.g. maize, peas)",
          "Animals: multicellular, no chloroplasts, no cell walls, movement & nervous coordination, store glycogen (e.g. humans, insects)",
          "Fungi: no photosynthesis, body = mycelium (hyphae), chitin cell walls, saprotrophic nutrition, store glycogen (e.g. Mucor, yeast)",
          "Protoctists: mostly single-celled, plant-like or animal-like (e.g. Amoeba, Chlorella, Plasmodium)",
          "Prokaryotes (Bacteria): single-celled, cell wall/membrane/cytoplasm/plasmids, no nucleus (circular DNA) (e.g. Lactobacillus, Pneumococcus)",
          "Pathogens: disease-causing organisms — bacteria, fungi, protoctists, viruses",
          "Viruses: not living, smaller than bacteria, reproduce inside living cells, protein coat + DNA/RNA (e.g. influenza, HIV, tobacco mosaic virus)",
        ],
      },
      {
        unit: "Chapter 2: Structure and Functions in Living Organisms",
        topics: [
          "(a) Level of organisation",
          "(b) Cell structure",
          "(c) Biological molecules",
          "(d) Movement of substances into and out of cells",
          "(e) Nutrition",
          "(f) Respiration",
          "(g) Gas exchange",
          "(h) Transport",
          "(i) Excretion",
          "(j) Co-ordination and response",
        ],
      },
      {
        unit: "Chapter 3: Reproduction and Inheritance",
        topics: [
          "(a) Reproduction",
          "(b) Inheritance",
        ],
      },
      {
        unit: "Chapter 4: Ecology and the Environment",
        topics: [
          "(a) The organism in the environment",
          "(b) Feeding relationships",
          "(c) Cycles within ecosystems",
          "(d) Human influences on the environment",
        ],
      },
    ],
  },
  "human-biology": {
    name: "Human Biology",
    topics: [
      {
        unit: "Section 1: Cells and Tissues",
        topics: [
          "Cell structure and function",
          "Cell division",
          "Tissues and organs",
        ],
      },
      {
        unit: "Section 2: Nutrition and Digestion",
        topics: [
          "Nutrients and diet",
          "The digestive system",
          "Enzymes in digestion",
          "Absorption",
        ],
      },
      {
        unit: "Section 3: Blood and Circulation",
        topics: [
          "Blood composition",
          "The heart",
          "Blood vessels",
          "Circulatory system diseases",
        ],
      },
      {
        unit: "Section 4: Gas Exchange and Respiration",
        topics: [
          "The respiratory system",
          "Breathing mechanism",
          "Gas exchange",
          "Cellular respiration",
        ],
      },
      {
        unit: "Section 5: Nervous System and Hormones",
        topics: [
          "The nervous system",
          "Sense organs",
          "The endocrine system",
          "Homeostasis",
        ],
      },
      {
        unit: "Section 6: Reproduction",
        topics: [
          "Male and female reproductive systems",
          "Fertilisation and pregnancy",
          "Birth and lactation",
          "Contraception",
        ],
      },
    ],
  },
};

const IGCSESubjectDetail = () => {
  const { subject } = useParams<{ subject: string }>();
  const subjectData = subject ? subjectSpecs[subject] : null;

  if (!subjectData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-heading font-bold text-[#1E3A8A]">Subject not found</h1>
            <Link to="/igcse-subjects">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Subjects
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link to="/igcse-subjects">
            <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to IGCSE Subjects
            </Button>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              IGCSE {subjectData.name}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-[#1E3A8A] mb-4">
              {subjectData.name}{" "}
              <span className="inline-block px-3 py-1 border-2 border-[#FACC15] rounded-lg">
                Specification
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore the complete syllabus topics for IGCSE {subjectData.name}.
            </p>
          </motion.div>

          {/* Resource Cards */}
          <div className="max-w-3xl mx-auto grid grid-cols-2 gap-4 mb-8">
            <Link to={`/resources/igcse/${subject}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#1E3A8A] rounded-xl p-5 cursor-pointer hover:bg-[#1E3A8A]/90 transition-colors"
              >
                <h4 className="font-heading font-bold text-white text-base md:text-lg">
                  Available Resources
                </h4>
                <p className="text-white/80 text-sm mt-1">
                  Notes, videos, worksheets, formula booklet & cheatsheet
                </p>
              </motion.div>
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#1E3A8A] rounded-xl p-5 cursor-pointer hover:bg-[#1E3A8A]/90 transition-colors"
            >
              <h4 className="font-heading font-bold text-white text-base md:text-lg">
                Quick Stats
              </h4>
              <p className="text-white/80 text-sm mt-1">
                {subjectData.topics.length} units • {subjectData.topics.reduce((acc, unit) => acc + unit.topics.length, 0)} topics
              </p>
            </motion.div>
          </div>

          {/* Topics */}
          <div className="max-w-3xl mx-auto space-y-6">
            {subjectData.topics.map((unit, index) => (
              <motion.div
                key={unit.unit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                className="bg-card rounded-xl border-2 border-[#1E3A8A] overflow-hidden hover:shadow-[0_8px_30px_rgba(250,204,21,0.3)] transition-all"
              >
                <div className="bg-[#1E3A8A]/5 px-6 py-4 border-b border-[#1E3A8A]">
                  <h2 className="font-heading font-bold text-lg text-[#1E3A8A]">
                    {unit.unit}
                  </h2>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {unit.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-3 text-muted-foreground hover:text-[#1E3A8A] transition-colors cursor-pointer">
                        <ChevronRight className="w-4 h-4 text-[#FACC15]" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IGCSESubjectDetail;