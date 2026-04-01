import { PrismaClient, StudyLevel, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categories = [
  "Education",
  "Health",
  "ICT",
  "Engineering",
  "Social Sciences",
  "Management",
  "Agriculture",
  "Environmental Studies"
];

type DepartmentSeed = {
  name: string;
  topics: Array<{ title: string; abstract: string; category: string; level: StudyLevel; tags: string[] }>;
};

type FacultySeed = { name: string; departments: DepartmentSeed[] };
type UniversitySeed = { name: string; state: string; faculties: FacultySeed[] };

const universities: UniversitySeed[] = [
  {
    name: "University of Lagos",
    state: "Lagos",
    faculties: [
      {
        name: "Engineering",
        departments: [
          {
            name: "Computer Engineering",
            topics: [
              {
                title: "IoT-Based Smart Hostel Energy Monitoring System for Nigerian Campuses",
                abstract: "Design and evaluation of a low-cost IoT architecture for monitoring electricity use and reducing waste in student hostels.",
                category: "Engineering",
                level: StudyLevel.UNDERGRADUATE,
                tags: ["iot", "energy", "embedded", "campus"]
              },
              {
                title: "Predictive Maintenance Model for University Water Pumps Using Sensor Telemetry",
                abstract: "A machine-learning driven maintenance scheduling system using vibration and pressure sensor data from campus utilities.",
                category: "ICT",
                level: StudyLevel.POSTGRADUATE,
                tags: ["predictive maintenance", "ml", "sensors"]
              }
            ]
          },
          {
            name: "Electrical and Electronics Engineering",
            topics: [
              {
                title: "Solar-Powered Mini-Grid Optimization for Lecture Theatres in Coastal Nigeria",
                abstract: "Optimization study on photovoltaic sizing and inverter control strategies for stable lecture theatre supply.",
                category: "Engineering",
                level: StudyLevel.POSTGRADUATE,
                tags: ["solar", "power systems", "optimization"]
              }
            ]
          }
        ]
      },
      {
        name: "Social Sciences",
        departments: [
          {
            name: "Economics",
            topics: [
              {
                title: "Effects of Inflation on Undergraduate Spending Patterns in Lagos",
                abstract: "Quantitative assessment of inflation shocks on student consumption baskets and coping mechanisms.",
                category: "Social Sciences",
                level: StudyLevel.UNDERGRADUATE,
                tags: ["inflation", "students", "consumer behavior"]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Ahmadu Bello University",
    state: "Kaduna",
    faculties: [
      {
        name: "Agriculture",
        departments: [
          {
            name: "Crop Science",
            topics: [
              {
                title: "Comparative Yield Analysis of Drought-Resilient Maize Varieties in Northern Nigeria",
                abstract: "Field trial comparing germination rates, biomass, and yield outcomes under low-rainfall conditions.",
                category: "Agriculture",
                level: StudyLevel.UNDERGRADUATE,
                tags: ["maize", "drought", "yield"]
              }
            ]
          }
        ]
      },
      {
        name: "Education",
        departments: [
          {
            name: "Educational Technology",
            topics: [
              {
                title: "Blended Learning Adoption in Public Universities in North-West Nigeria",
                abstract: "Study on barriers, digital readiness, and pedagogical outcomes of blended learning in tertiary institutions.",
                category: "Education",
                level: StudyLevel.POSTGRADUATE,
                tags: ["blended learning", "edtech", "adoption"]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "University of Nigeria, Nsukka",
    state: "Enugu",
    faculties: [
      {
        name: "Health Sciences",
        departments: [
          {
            name: "Nursing Science",
            topics: [
              {
                title: "Assessment of Maternal Health Education Awareness in Rural Enugu Communities",
                abstract: "Cross-sectional study evaluating maternal health literacy, antenatal care utilization, and health outcomes.",
                category: "Health",
                level: StudyLevel.UNDERGRADUATE,
                tags: ["maternal health", "rural health", "awareness"]
              }
            ]
          }
        ]
      },
      {
        name: "Environmental Studies",
        departments: [
          {
            name: "Urban and Regional Planning",
            topics: [
              {
                title: "Flood Risk Mapping and Urban Drainage Challenges in South-East Nigerian Cities",
                abstract: "GIS-based analysis of flood vulnerability and institutional planning gaps in secondary cities.",
                category: "Environmental Studies",
                level: StudyLevel.POSTGRADUATE,
                tags: ["flooding", "gis", "urban planning"]
              }
            ]
          }
        ]
      }
    ]
  }
];

async function main() {
  await prisma.bookmark.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.department.deleteMany();
  await prisma.faculty.deleteMany();
  await prisma.university.deleteMany();
  await prisma.topicCategory.deleteMany();
  await prisma.serviceRequest.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.user.deleteMany();

  const categoryMap = new Map<string, string>();
  for (const name of categories) {
    const category = await prisma.topicCategory.create({ data: { name } });
    categoryMap.set(name, category.id);
  }

  for (const uni of universities) {
    const createdUni = await prisma.university.create({ data: { name: uni.name, state: uni.state } });

    for (const fac of uni.faculties) {
      const createdFac = await prisma.faculty.create({
        data: {
          name: fac.name,
          universityId: createdUni.id
        }
      });

      for (const dep of fac.departments) {
        const createdDep = await prisma.department.create({
          data: {
            name: dep.name,
            facultyId: createdFac.id
          }
        });

        for (const topic of dep.topics) {
          await prisma.topic.create({
            data: {
              title: topic.title,
              abstract: topic.abstract,
              tags: topic.tags,
              level: topic.level,
              universityId: createdUni.id,
              facultyId: createdFac.id,
              departmentId: createdDep.id,
              categoryId: categoryMap.get(topic.category)!
            }
          });
        }
      }
    }
  }

  const hashed = await bcrypt.hash("Admin@12345", 12);
  const adminUser = await prisma.user.create({
    data: {
      name: "ProjectHelper Admin",
      email: "admin@projecthelper.ng",
      passwordHash: hashed,
      role: UserRole.ADMIN
    }
  });

  await prisma.admin.create({ data: { userId: adminUser.id } });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
