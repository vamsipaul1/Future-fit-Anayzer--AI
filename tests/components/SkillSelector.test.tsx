import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SkillSelector } from '@/src/components/analyze/SkillSelector'

const mockSkills = [
  { id: 'react', name: 'React', domainId: 'web-dev' },
  { id: 'nodejs', name: 'Node.js', domainId: 'web-dev' },
  { id: 'python', name: 'Python', domainId: 'data-science' }
]

const mockSelectedSkills = [
  { skillId: 'react', level: 70 }
]

describe('SkillSelector', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders selected skills', () => {
    render(
      <SkillSelector
        selectedSkills={mockSelectedSkills}
        onChange={mockOnChange}
        availableSkills={mockSkills}
      />
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('70%')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
  })

  it('shows empty state when no skills selected', () => {
    render(
      <SkillSelector
        selectedSkills={[]}
        onChange={mockOnChange}
        availableSkills={mockSkills}
      />
    )

    expect(screen.getByText('No skills selected yet')).toBeInTheDocument()
    expect(screen.getByText('Add skills to get started with your analysis')).toBeInTheDocument()
  })

  it('allows adding new skills', async () => {
    render(
      <SkillSelector
        selectedSkills={[]}
        onChange={mockOnChange}
        availableSkills={mockSkills}
      />
    )

    const searchInput = screen.getByPlaceholderText('Search skills...')
    fireEvent.focus(searchInput)
    fireEvent.change(searchInput, { target: { value: 'React' } })

    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument()
    })

    const reactSkill = screen.getByText('React')
    fireEvent.click(reactSkill)

    expect(mockOnChange).toHaveBeenCalledWith([
      { skillId: 'react', level: 50 }
    ])
  })

  it('allows removing skills', () => {
    render(
      <SkillSelector
        selectedSkills={mockSelectedSkills}
        onChange={mockOnChange}
        availableSkills={mockSkills}
      />
    )

    const removeButton = screen.getByRole('button', { name: /remove/i })
    fireEvent.click(removeButton)

    expect(mockOnChange).toHaveBeenCalledWith([])
  })

  it('allows changing skill levels', () => {
    render(
      <SkillSelector
        selectedSkills={mockSelectedSkills}
        onChange={mockOnChange}
        availableSkills={mockSkills}
      />
    )

    const slider = screen.getByRole('slider')
    fireEvent.change(slider, { target: { value: '80' } })

    expect(mockOnChange).toHaveBeenCalledWith([
      { skillId: 'react', level: 80 }
    ])
  })

  it('filters skills by domain', () => {
    render(
      <SkillSelector
        domainId="web-dev"
        selectedSkills={[]}
        onChange={mockOnChange}
        availableSkills={mockSkills}
      />
    )

    const searchInput = screen.getByPlaceholderText('Search skills...')
    fireEvent.focus(searchInput)

    // Should show web-dev skills
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    
    // Should not show data-science skills
    expect(screen.queryByText('Python')).not.toBeInTheDocument()
  })

  it('shows correct skill level colors', () => {
    const skillsWithDifferentLevels = [
      { skillId: 'react', level: 30 }, // Beginner
      { skillId: 'nodejs', level: 60 }, // Intermediate
      { skillId: 'python', level: 80 } // Advanced
    ]

    render(
      <SkillSelector
        selectedSkills={skillsWithDifferentLevels}
        onChange={mockOnChange}
        availableSkills={mockSkills}
      />
    )

    expect(screen.getByText('Beginner')).toBeInTheDocument()
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
    expect(screen.getByText('Advanced')).toBeInTheDocument()
  })

  it('handles search functionality', async () => {
    render(
      <SkillSelector
        selectedSkills={[]}
        onChange={mockOnChange}
        availableSkills={mockSkills}
      />
    )

    const searchInput = screen.getByPlaceholderText('Search skills...')
    fireEvent.focus(searchInput)
    fireEvent.change(searchInput, { target: { value: 'node' } })

    await waitFor(() => {
      expect(screen.getByText('Node.js')).toBeInTheDocument()
      expect(screen.queryByText('React')).not.toBeInTheDocument()
      expect(screen.queryByText('Python')).not.toBeInTheDocument()
    })
  })

  it('shows no results message for invalid search', async () => {
    render(
      <SkillSelector
        selectedSkills={[]}
        onChange={mockOnChange}
        availableSkills={mockSkills}
      />
    )

    const searchInput = screen.getByPlaceholderText('Search skills...')
    fireEvent.focus(searchInput)
    fireEvent.change(searchInput, { target: { value: 'invalid' } })

    await waitFor(() => {
      expect(screen.getByText('No skills found for "invalid"')).toBeInTheDocument()
    })
  })
})
