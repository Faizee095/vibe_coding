// src/components/ResumeTemplates.tsx
import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Link,
  Image
} from '@react-pdf/renderer';

// Create styles for all templates
const styles = StyleSheet.create({
  // Common styles
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  subHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  text: {
    fontSize: 10,
    marginBottom: 3,
  },
  
  // Classic template styles
  classicPage: {
    padding: 30,
    fontFamily: 'Times-Roman',
    color: '#333333',
  },
  classicName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  classicTitle: {
    fontSize: 14,
    marginBottom: 15,
    color: '#555555',
  },
  classicSection: {
    marginBottom: 15,
    borderBottom: '1px solid #DDDDDD',
    paddingBottom: 10,
  },
  classicHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  classicJob: {
    marginBottom: 10,
  },
  classicJobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  classicCompany: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  classicDate: {
    fontSize: 10,
    color: '#555555',
  },
  classicContact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    fontSize: 10,
  },
  classicContactItem: {
    marginRight: 15,
  },
  
  // Modern template styles
  modernPage: {
    fontFamily: 'Helvetica',
  },
  modernHeader: {
    backgroundColor: '#1a365d', // Dark blue header
    color: '#e2e8f0',
    padding: 30,
    textAlign: 'center',
  },
  modernName: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#ecc94b', // Gold color
    marginBottom: 5,
  },
  modernTitle: {
    fontSize: 14,
    color: '#e2e8f0',
    letterSpacing: 1,
  },
  modernBody: {
    padding: 30,
  },
  modernSection: {
    marginBottom: 20,
  },
  modernHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
    color: '#1a365d', // Dark blue to match header
    borderBottom: '1px solid #cbd5e0',
    paddingBottom: 3,
  },
  modernContactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  modernContactItem: {
    marginHorizontal: 10,
    fontSize: 10,
    color: '#e2e8f0',
  },
  modernJob: {
    marginBottom: 10,
  },
  modernJobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  modernCompany: {
    fontSize: 11,
  },
  modernDate: {
    fontSize: 10,
    color: '#718096',
  },
  modernSkillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modernSkill: {
    backgroundColor: '#edf2f7',
    borderRadius: 3,
    padding: '3 6',
    margin: 3,
    fontSize: 9,
  },
  
  // Minimalist template styles
  minimalistPage: {
    padding: 40,
    fontFamily: 'Helvetica',
    color: '#2d3748',
  },
  minimalistName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  minimalistTitle: {
    fontSize: 14,
    marginBottom: 20,
    color: '#718096',
  },
  minimalistDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 15,
  },
  minimalistSection: {
    marginBottom: 15,
  },
  minimalistHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
    color: '#2d3748',
    letterSpacing: 1,
  },
  minimalistContact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    fontSize: 10,
  },
  minimalistContactItem: {
    marginRight: 15,
    color: '#4a5568',
  },
  minimalistJob: {
    marginBottom: 10,
  },
  minimalistJobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  minimalistCompany: {
    fontSize: 10,
  },
  minimalistDate: {
    fontSize: 9,
    color: '#718096',
  },
  minimalistSkillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  minimalistSkill: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 2,
    padding: '2 5',
    margin: 2,
    fontSize: 9,
  },
});

// Classic Template
export const ClassicTemplate = ({ data }: any) => (
  <Document>
    <Page size="A4" style={styles.classicPage}>
      {/* Header with name and title */}
      <View>
        <Text style={styles.classicName}>{data?.name || 'Anna Taylor'}</Text>
        <Text style={styles.classicTitle}>{data?.title || 'Certified Medical Assistant'}</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.classicContact}>
        <Text style={styles.classicContactItem}>📧 {data?.email || 'email@example.com'}</Text>
        <Text style={styles.classicContactItem}>📱 {data?.phone || '123-456-7890'}</Text>
        <Text style={styles.classicContactItem}>📍 {data?.location || 'City, State'}</Text>
        <Text style={styles.classicContactItem}>💼 {data?.linkedin || 'linkedin.com/in/username'}</Text>
      </View>

      {/* Summary */}
      {data?.summary && (
        <View style={styles.classicSection}>
          <Text style={styles.classicHeading}>Professional Summary</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>
      )}

      {/* Work Experience */}
      <View style={styles.classicSection}>
        <Text style={styles.classicHeading}>Work Experience</Text>
        
        {data?.experience?.map((job: any, index: number) => (
          <View key={index} style={styles.classicJob}>
            <Text style={styles.classicJobTitle}>
              {job?.jobTitle || 'Medical Assistant'}
            </Text>
            <Text style={styles.classicCompany}>
              {job?.companyName || 'First Choice Health Institute'} - {job?.location || 'Houston, TX'}
            </Text>
            <Text style={styles.classicDate}>
              {job?.startDate || '08/2018'} - {job?.endDate || 'Present'}
            </Text>
            <Text style={styles.text}>{job?.description || 'Job responsibilities and achievements'}</Text>
          </View>
        ))}
      </View>

      {/* Education */}
      <View style={styles.classicSection}>
        <Text style={styles.classicHeading}>Education</Text>
        
        {data?.education?.map((edu: any, index: number) => (
          <View key={index} style={styles.classicJob}>
            <Text style={styles.classicJobTitle}>
              {edu?.degree || 'Bachelor of Science in Healthcare Management'}
            </Text>
            <Text style={styles.classicCompany}>
              {edu?.university || 'University of Houston'}
            </Text>
            <Text style={styles.classicDate}>
              {edu?.year || '2005 - 2008'}
            </Text>
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.classicSection}>
        <Text style={styles.classicHeading}>Skills</Text>
        <Text style={styles.text}>
          {Array.isArray(data?.skills) 
            ? data.skills.join(', ') 
            : 'Patient Care, Database Management, Inventory Management, Medical Billing'}
        </Text>
      </View>

      {/* Certifications */}
      {data?.certifications && (
        <View style={styles.classicSection}>
          <Text style={styles.classicHeading}>Certifications</Text>
          {data.certifications.map((cert: any, index: number) => (
            <Text key={index} style={styles.text}>
              {cert.title || `Certification ${index+1}`} - {cert.issuer || 'Issuing Organization'}
            </Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

// Modern Template
export const ModernTemplate = ({ data }: any) => (
  <Document>
    <Page size="A4" style={styles.modernPage}>
      {/* Header */}
      <View style={styles.modernHeader}>
        <Text style={styles.modernName}>{data?.name || 'EMMA WATSON'}</Text>
        <Text style={styles.modernTitle}>{data?.title || 'YOUR PROFESSIONAL TITLE'}</Text>
        
        {/* Contact Information */}
        <View style={styles.modernContactRow}>
          <Text style={styles.modernContactItem}>{data?.phone || '123-456-7890'}</Text>
          <Text style={styles.modernContactItem}>{data?.email || 'email@example.com'}</Text>
        </View>
        <View style={styles.modernContactRow}>
          <Text style={styles.modernContactItem}>{data?.location || 'City, State'}</Text>
          <Text style={styles.modernContactItem}>{data?.linkedin || 'linkedin.com/in/username'}</Text>
        </View>
      </View>

      {/* Body */}
      <View style={styles.modernBody}>
        {/* Profile */}
        {data?.summary && (
          <View style={styles.modernSection}>
            <Text style={styles.modernHeading}>Profile</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        <View style={styles.modernSection}>
          <Text style={styles.modernHeading}>Professional Experience</Text>
          
          {data?.experience?.map((job: any, index: number) => (
            <View key={index} style={styles.modernJob}>
              <Text style={styles.modernJobTitle}>
                {job?.jobTitle || 'JOB TITLE'}
              </Text>
              <Text style={styles.modernCompany}>
                {job?.companyName || 'Company Name'} | {job?.location || 'City, State'} | {job?.startDate || 'Start Date'} - {job?.endDate || 'End Date'}
              </Text>
              <Text style={styles.text}>{job?.description || 'Job description with responsibilities and achievements'}</Text>
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.modernSection}>
          <Text style={styles.modernHeading}>Education</Text>
          
          {data?.education?.map((edu: any, index: number) => (
            <View key={index} style={styles.modernJob}>
              <Text style={styles.modernJobTitle}>
                {edu?.degree || 'DEGREE NAME / MAJOR'}
              </Text>
              <Text style={styles.modernCompany}>
                {edu?.university || 'University Name'} | {edu?.year || '2010-2014'}
              </Text>
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.modernSection}>
          <Text style={styles.modernHeading}>Skills</Text>
          <View style={styles.modernSkillsRow}>
            {Array.isArray(data?.skills) 
              ? data.skills.map((skill: string, index: number) => (
                  <Text key={index} style={styles.modernSkill}>
                    {skill}
                  </Text>
                ))
              : ['Relevant Skill', 'Relevant Skill', 'Relevant Skill'].map((skill, index) => (
                  <Text key={index} style={styles.modernSkill}>
                    {skill}
                  </Text>
                ))
            }
          </View>
        </View>

        {/* Certifications */}
        {data?.certifications && (
          <View style={styles.modernSection}>
            <Text style={styles.modernHeading}>Certifications</Text>
            {data.certifications.map((cert: any, index: number) => (
              <Text key={index} style={styles.text}>
                • {cert.title || `Certification ${index+1}`} - {cert.issuer || 'Issuing Organization'}
              </Text>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

// Minimalist Template
export const MinimalistTemplate = ({ data }: any) => (
  <Document>
    <Page size="A4" style={styles.minimalistPage}>
      {/* Header with name and title */}
      <View>
        <Text style={styles.minimalistName}>{data?.name || 'Your Name'}</Text>
        <Text style={styles.minimalistTitle}>{data?.title || 'Your Professional Title'}</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.minimalistContact}>
        <Text style={styles.minimalistContactItem}>{data?.email || 'email@example.com'}</Text>
        <Text style={styles.minimalistContactItem}>{data?.phone || '123-456-7890'}</Text>
        <Text style={styles.minimalistContactItem}>{data?.location || 'City, State'}</Text>
        <Text style={styles.minimalistContactItem}>{data?.linkedin || 'linkedin.com/in/username'}</Text>
      </View>

      <View style={styles.minimalistDivider} />

      {/* Summary */}
      {data?.summary && (
        <View style={styles.minimalistSection}>
          <Text style={styles.minimalistHeading}>Profile</Text>
          <Text style={styles.text}>{data.summary}</Text>
        </View>
      )}

      {/* Work Experience */}
      <View style={styles.minimalistSection}>
        <Text style={styles.minimalistHeading}>Experience</Text>
        
        {data?.experience?.map((job: any, index: number) => (
          <View key={index} style={styles.minimalistJob}>
            <Text style={styles.minimalistJobTitle}>
              {job?.jobTitle || 'Position Title'} • {job?.companyName || 'Company Name'}
            </Text>
            <Text style={styles.minimalistDate}>
              {job?.startDate || 'Start Date'} - {job?.endDate || 'End Date'} | {job?.location || 'Location'}
            </Text>
            <Text style={styles.text}>{job?.description || 'Job description'}</Text>
          </View>
        ))}
      </View>

      <View style={styles.minimalistDivider} />

      {/* Education */}
      <View style={styles.minimalistSection}>
        <Text style={styles.minimalistHeading}>Education</Text>
        
        {data?.education?.map((edu: any, index: number) => (
          <View key={index} style={styles.minimalistJob}>
            <Text style={styles.minimalistJobTitle}>
              {edu?.degree || 'Degree'} • {edu?.university || 'University'}
            </Text>
            <Text style={styles.minimalistDate}>
              {edu?.year || 'Graduation Year'}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.minimalistDivider} />

      {/* Skills */}
      <View style={styles.minimalistSection}>
        <Text style={styles.minimalistHeading}>Skills</Text>
        <View style={styles.minimalistSkillsRow}>
          {Array.isArray(data?.skills) 
            ? data.skills.map((skill: string, index: number) => (
                <Text key={index} style={styles.minimalistSkill}>
                  {skill}
                </Text>
              ))
            : ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4'].map((skill, index) => (
                <Text key={index} style={styles.minimalistSkill}>
                  {skill}
                </Text>
              ))
          }
        </View>
      </View>

      {/* Certifications */}
      {data?.certifications && (
        <View style={styles.minimalistSection}>
          <Text style={styles.minimalistHeading}>Certifications</Text>
          {data.certifications.map((cert: any, index: number) => (
            <Text key={index} style={styles.text}>
              • {cert.title || `Certification ${index+1}`} • {cert.issuer || 'Issuing Organization'}
            </Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default {
  Classic: ClassicTemplate,
  Modern: ModernTemplate,
  Minimalist: MinimalistTemplate
};