import { PatientEvent } from "./types/Event";

export const cancerTypes = (): string[] => ([
  'Acute Lymphoblastic Leukemia',
  'Acute Myeloid Leukemia',
  'Anal Carcinoma',
  'Basal Cell Skin Cancer',
  'B-Cell Lymphomas',
  'Bladder',
  'Bone',
  'Breast',
  'Central Nervous System',
  'Cervical',
  'Chronic Lymphocytic Leukemia/Small Lymphocytic Lymphoma',
  'Chronic Myeloid Leukemia',
  'Colon',
  'Dermatofibrosarcoma Protruberans',
  'Esophageal and Esophagogastric Junction',
  'Gastric',
  'Gastrointestinal Stromal Tumors (GIST)',
  'Gestational Trophoblastic Neoplasia',
  'Hairy Cell Leukemia',
  'Head and Neck',
  'Hepatobiliary',
  'Histiocytic Neoplasms',
  'Hodgkin Lymphoma',
  'Kaposi Sarcoma',
  'Renal Cell Carcinoma',
  'Malignant Pleural Mesothelioma',
  'Melanoma: Cutaneous',
  'Melanoma: Uveal',
  'Merkel Cell Carcinoma',
  'Multiple Myeloma',
  'Myelodysplastic Syndromes',
  'Myeloproliferative Neoplasms',
  'Neuroendocrine and Adrenal Tumors',
  'Non-Small Cell Lung Cancer',
  'Ovarian/Fallopian Tube/Primary Peritoneal',
  'Pancreatic Adenocarcinoma',
  'Pediatric Acute Lymphoblastic Leukemia',
  'Pediatric Aggressive Mature B-Cell Lymphomas',
  'Pediatric Hodgkin Lymphoma',
  'Penile',
  'Primary Cutaneous Lymphomas',
  'Prostate',
  'Rectal',
  'Retinoblastoma',
  'Rhabdomyosarcoma',
  'Small Bowel Adenocarcinoma',
  'Small Cell Lung',
  'Soft Tissue Sarcoma',
  'Squamous Cell Skin',
  'Systemic Light Chain Amyloidosis',
  'Systemic Mastocytosis',
  'T-Cell Lymphomas',
  'Testicular Cancer',
  'Thymomas and Thymic Carcinomas',
  'Thyroid Carcinoma',
  'Uterine Neoplasms',
  'Vaginal',
  'Vulvar',
  'Waldenstrom Macroglobulinemia/Lymphoplasmacytic Lymphoma',
  'Wilms Tumor (Nephroblastoma)',
  'Other'
]);

export const treatmentTypes = (): string[] => ([
  'Chemotherapy',
  'Radiation Therapy',
  'Surgery',
  'Immunotherapy',
  'Stem Cell/Bone Marrow Transplant',
  'Hormone Therapy',
  'Interventional Radiology'
]);

export const defaultEvents = (): PatientEvent[] => ([
  {
    user: 'patient', cancerType: 'Prostate', date: new Date(2020, 10, 15), treatmentType: 'Chemotherapy',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In turpis ante, elementum sed ligula ac, scelerisque cursus magna.'
  },
  {
    user: 'patient', cancerType: 'Prostate', date: new Date(2020, 10, 18), treatmentType: 'Radiation Therapy',
    details: 'Lorem ipsum dolor sit amet'
  },
  {
    user: 'patient', cancerType: 'Bone', date: new Date(2020, 10, 18), treatmentType: 'Radiation Therapy',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    user: 'patient', cancerType: 'Prostate', date: new Date(2021, 1, 18), treatmentType: 'Radiation Therapy',
    details: 'Lorem ipsum dolor sit amet'
  },
  {
    user: 'patient', cancerType: 'Bone', date: new Date(2021, 1, 8), treatmentType: 'Radiation Therapy',
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
]);