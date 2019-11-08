import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'The Author',
    url: 'www.test.com',
    user: { name: 'Tester' },
    likes: 5
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} name='Tester' />
    )
  })

  test('renders its children', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent(
      'The Author'
    )
  })

  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const divShow = component.container.querySelector('.show')
    fireEvent.click(divShow)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', () => {
    const divShow = component.container.querySelector('.show')
    fireEvent.click(divShow)

    const divHide = component.container.querySelector('.hide')
    fireEvent.click(divHide)

    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

})