import { test, expect } from '@playwright/test'

test.describe('Skill Analysis Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the skill analysis page
    await page.goto('/skill-analysis')
  })

  test('should complete the full skill analysis flow', async ({ page }) => {
    // Step 1: Select Domain
    await expect(page.getByText('Choose Your Domain')).toBeVisible()
    
    // Select Web Development domain
    await page.click('[data-testid="domain-web-development"]')
    await page.click('text=Continue to Skills Selection')

    // Step 2: Select Skills
    await expect(page.getByText('Select Your Skills')).toBeVisible()
    
    // Add React skill
    await page.fill('input[placeholder="Search skills..."]', 'React')
    await page.click('text=React')
    
    // Add Node.js skill
    await page.fill('input[placeholder="Search skills..."]', 'Node.js')
    await page.click('text=Node.js')
    
    // Adjust skill levels
    await page.fill('input[type="range"]', '80')
    
    // Start assessment
    await page.click('text=Start Assessment')

    // Step 3: Take Quiz
    await expect(page.getByText('Take the Assessment')).toBeVisible()
    
    // Answer first question
    await page.click('text=Option A')
    await page.click('text=Submit Answer')
    
    // Answer second question
    await page.fill('textarea', 'const Counter = () => { const [count, setCount] = useState(0); return <div>{count}</div>; };')
    await page.click('text=Submit Answer')
    
    // Continue through quiz
    await page.click('text=Skip Question')

    // Step 4: View Results
    await expect(page.getByText('Your Analysis Results')).toBeVisible()
    
    // Check role fit analysis
    await expect(page.getByText('Role Fit Analysis')).toBeVisible()
    
    // Check skill radar chart
    await expect(page.getByText('Your Skill Profile')).toBeVisible()
    
    // Check learning roadmap
    await expect(page.getByText('Your Learning Roadmap')).toBeVisible()
  })

  test('should handle domain selection', async ({ page }) => {
    // Test domain selection
    await page.click('[data-testid="domain-data-science"]')
    
    // Verify domain is selected
    await expect(page.getByText('Data Science')).toBeVisible()
    await expect(page.getByText('Selected Domain')).toBeVisible()
    
    // Continue to skills
    await page.click('text=Continue to Skills Selection')
    
    // Verify we're on skills page
    await expect(page.getByText('Select Your Skills')).toBeVisible()
  })

  test('should handle skill selection and level adjustment', async ({ page }) => {
    // Navigate to skills page
    await page.click('[data-testid="domain-web-development"]')
    await page.click('text=Continue to Skills Selection')
    
    // Add multiple skills
    await page.fill('input[placeholder="Search skills..."]', 'React')
    await page.click('text=React')
    
    await page.fill('input[placeholder="Search skills..."]', 'TypeScript')
    await page.click('text=TypeScript')
    
    // Verify skills are added
    await expect(page.getByText('React')).toBeVisible()
    await expect(page.getByText('TypeScript')).toBeVisible()
    
    // Adjust skill levels
    const sliders = page.locator('input[type="range"]')
    await sliders.nth(0).fill('80')
    await sliders.nth(1).fill('60')
    
    // Verify levels are updated
    await expect(page.getByText('80%')).toBeVisible()
    await expect(page.getByText('60%')).toBeVisible()
    
    // Remove a skill
    await page.click('[data-testid="remove-react"]')
    
    // Verify skill is removed
    await expect(page.queryByText('React')).not.toBeVisible()
  })

  test('should handle quiz navigation', async ({ page }) => {
    // Navigate to quiz
    await page.click('[data-testid="domain-web-development"]')
    await page.click('text=Continue to Skills Selection')
    await page.fill('input[placeholder="Search skills..."]', 'React')
    await page.click('text=React')
    await page.click('text=Start Assessment')
    
    // Test quiz navigation
    await expect(page.getByText('Question 1 of 10')).toBeVisible()
    
    // Answer question
    await page.click('text=Option B')
    await page.click('text=Submit Answer')
    
    // Verify progress
    await expect(page.getByText('Question 2 of 10')).toBeVisible()
    
    // Skip question
    await page.click('text=Skip Question')
    
    // Verify progress
    await expect(page.getByText('Question 3 of 10')).toBeVisible()
  })

  test('should display results correctly', async ({ page }) => {
    // Complete the flow to results
    await page.click('[data-testid="domain-web-development"]')
    await page.click('text=Continue to Skills Selection')
    await page.fill('input[placeholder="Search skills..."]', 'React')
    await page.click('text=React')
    await page.click('text=Start Assessment')
    
    // Quick quiz completion
    await page.click('text=Skip Question')
    await page.click('text=Skip Question')
    await page.click('text=Skip Question')
    
    // Verify results page
    await expect(page.getByText('Your Analysis Results')).toBeVisible()
    
    // Check role fit cards
    await expect(page.getByText('Full Stack Developer')).toBeVisible()
    await expect(page.getByText('Frontend Developer')).toBeVisible()
    
    // Check skill levels
    await expect(page.getByText('Beginner')).toBeVisible()
    await expect(page.getByText('Intermediate')).toBeVisible()
    await expect(page.getByText('Advanced')).toBeVisible()
    
    // Check roadmap
    await expect(page.getByText('Milestones')).toBeVisible()
    await expect(page.getByText('Projects')).toBeVisible()
  })

  test('should handle AI mentor chat', async ({ page }) => {
    // Open mentor chat
    await page.click('[data-testid="mentor-chat-button"]')
    
    // Verify chat is open
    await expect(page.getByText('AI Mentor')).toBeVisible()
    
    // Send a message
    await page.fill('input[placeholder*="Ask me anything"]', 'How can I improve my React skills?')
    await page.click('button[type="submit"]')
    
    // Verify message is sent
    await expect(page.getByText('How can I improve my React skills?')).toBeVisible()
    
    // Wait for AI response
    await expect(page.getByText('Thinking...')).toBeVisible()
    
    // Close chat
    await page.click('[data-testid="close-chat"]')
    
    // Verify chat is closed
    await expect(page.queryByText('AI Mentor')).not.toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Verify mobile layout
    await expect(page.getByText('Choose Your Domain')).toBeVisible()
    
    // Test domain selection on mobile
    await page.click('[data-testid="domain-web-development"]')
    await page.click('text=Continue to Skills Selection')
    
    // Verify skills page works on mobile
    await expect(page.getByText('Select Your Skills')).toBeVisible()
    
    // Test skill addition on mobile
    await page.fill('input[placeholder="Search skills..."]', 'React')
    await page.click('text=React')
    
    // Verify skill is added
    await expect(page.getByText('React')).toBeVisible()
  })

  test('should handle errors gracefully', async ({ page }) => {
    // Test with no skills selected
    await page.click('[data-testid="domain-web-development"]')
    await page.click('text=Continue to Skills Selection')
    
    // Try to start assessment without skills
    const startButton = page.getByText('Start Assessment')
    await expect(startButton).toBeDisabled()
    
    // Add a skill and try again
    await page.fill('input[placeholder="Search skills..."]', 'React')
    await page.click('text=React')
    
    // Now button should be enabled
    await expect(startButton).toBeEnabled()
  })
})
