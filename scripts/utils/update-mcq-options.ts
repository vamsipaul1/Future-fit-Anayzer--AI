import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateMCQOptions() {
  try {
    console.log('🔄 Updating all MCQ questions to have exactly 4 options...');

    // Get all MCQ questions
    const mcqQuestions = await prisma.question.findMany({
      where: { type: 'MCQ' }
    });

    console.log(`📚 Found ${mcqQuestions.length} MCQ questions to update`);

    let updatedCount = 0;

    for (const question of mcqQuestions) {
      try {
        // Parse existing options
        let existingOptions = [];
        if (question.options) {
          try {
            existingOptions = JSON.parse(question.options);
          } catch (e) {
            console.log(`⚠️ Could not parse options for question ${question.id}, creating new ones`);
          }
        }

        // Ensure we have exactly 4 options
        const skillName = question.question.includes('What is') ? 
          question.question.split('What is')[1]?.split('?')[0]?.trim() || 'this skill' :
          'this skill';

        const newOptions = [
          `Basic ${skillName} implementation`,
          `Advanced ${skillName} with optimization`,
          `Simple ${skillName} approach`,
          `Complex ${skillName} solution`
        ];

        // Update the question with 4 options
        await prisma.question.update({
          where: { id: question.id },
          data: {
            options: JSON.stringify(newOptions),
            answer: newOptions[0] // Set first option as default answer
          }
        });

        updatedCount++;
        console.log(`✅ Updated question ${question.id}: ${question.question.substring(0, 50)}...`);

      } catch (error) {
        console.error(`❌ Error updating question ${question.id}:`, error);
      }
    }

    console.log('🎉 MCQ options update completed!');
    console.log(`📊 Summary:`);
    console.log(`   - Questions processed: ${mcqQuestions.length}`);
    console.log(`   - Successfully updated: ${updatedCount}`);
    
  } catch (error) {
    console.error('❌ Error updating MCQ options:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateMCQOptions();
