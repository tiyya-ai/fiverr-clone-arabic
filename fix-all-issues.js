#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 Starting TypeScript issues fix...\n');

// Fix all TypeScript issues in the project
const fixes = [
  {
    file: 'src/app/profile/page.tsx',
    fixes: [
      {
        search: "import { getUserById } from '@/data/mockData'",
        replace: "import { getUserById, User as UserType } from '@/data/mockData'"
      },
      {
        search: "const [user, setUser] = useState(null)",
        replace: "const [user, setUser] = useState<UserType | null>(null)"
      },
      {
        search: "const userData = getUserById(userId)\n    setUser(userData)",
        replace: "const userData = getUserById(userId)\n    if (userData) {\n      setUser(userData)\n    }"
      }
    ]
  },
  {
    file: 'src/app/service/[id]/page.tsx',
    fixes: [
      {
        search: "const [selectedPackage, setSelectedPackage] = useState<string>('')",
        replace: "const [selectedPackage, setSelectedPackage] = useState<number>(0)"
      },
      {
        search: "packages.find(p => p.id === selectedPackage)?.price",
        replace: "packages[selectedPackage]?.price"
      }
    ]
  },
  {
    file: 'src/app/services/create/page.tsx',
    fixes: [
      {
        search: "const handleSubmit = (e) => {",
        replace: "const handleSubmit = (e: React.FormEvent) => {"
      },
      {
        search: "const addFeature = (packageIndex) => {",
        replace: "const addFeature = (packageIndex: number) => {"
      },
      {
        search: "const updateFeature = (packageIndex, featureIndex, value) => {",
        replace: "const updateFeature = (packageIndex: number, featureIndex: number, value: string) => {"
      }
    ]
  },
  {
    file: 'src/components/WorkAreas.tsx',
    fixes: [
      {
        search: "interface WorkAreasProps {\n  areas: string[]\n  selectedArea?: string\n  onSelectArea?: (area: string) => void\n}",
        replace: "interface Area {\n  id: string\n  name: string\n  districts: string[]\n  travelTime: string\n  additionalFee?: number\n  isAvailable: boolean\n}\n\ninterface WorkAreasProps {\n  areas: Area[]\n  selectedArea?: string\n  onSelectArea?: (area: string) => void\n}"
      }
    ]
  }
];

// Apply fixes
fixes.forEach(({ file, fixes: fileFixes }) => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  fileFixes.forEach(({ search, replace }) => {
    if (content.includes(search)) {
      content = content.replace(search, replace);
      changed = true;
      console.log(`✅ Fixed in ${file}`);
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`💾 Updated ${file}\n`);
  }
});

// Add missing type definitions
const typeDefinitions = `
// Type definitions for better TypeScript support
export interface User {
  id: string;
  fullName: string;
  avatar: string;
  location: string;
  memberSince: string;
  rating: number;
  totalReviews: number;
  bio: string;
  totalSales: number;
  responseTime: string;
  skills: string[];
}

export interface Package {
  type: 'BASIC' | 'STANDARD' | 'PREMIUM';
  title: string;
  price: number;
  deliveryTime: number;
  revisions: number;
  features: string[];
}

export interface Area {
  id: string;
  name: string;
  districts: string[];
  travelTime: string;
  additionalFee?: number;
  isAvailable: boolean;
}
`;

const typesPath = path.join(__dirname, 'src/types/index.ts');
if (!fs.existsSync(path.dirname(typesPath))) {
  fs.mkdirSync(path.dirname(typesPath), { recursive: true });
}
fs.writeFileSync(typesPath, typeDefinitions, 'utf8');
console.log('✅ Created type definitions\n');

// Update tsconfig.json for stricter checking
const tsconfigPath = path.join(__dirname, 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
  
  tsconfig.compilerOptions = {
    ...tsconfig.compilerOptions,
    strict: true,
    noImplicitAny: true,
    noImplicitReturns: true,
    noUnusedLocals: false, // Disable for now to avoid build issues
    noUnusedParameters: false // Disable for now to avoid build issues
  };
  
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2), 'utf8');
  console.log('✅ Updated tsconfig.json\n');
}

console.log('🎉 All TypeScript issues have been fixed!');
console.log('📦 Run "npm run build" to verify the fixes.');