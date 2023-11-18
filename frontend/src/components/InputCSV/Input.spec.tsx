import handleSubmit from './index'

describe('handleSubmit', () => {
  it('should set error message if input is invalid', async () => {
    const setError = jest.fn()
    const setLoading = jest.fn()
    const setJsonData = jest.fn()
    const API = { post: jest.fn() }

    const expectedErrorMessage = 'Nenhum arquivo CSV selecionado.'

    await handleSubmit()

    expect(setError).toHaveBeenCalledWith(expectedErrorMessage)
    expect(setLoading).toHaveBeenCalledWith(false)
    expect(API.post).not.toHaveBeenCalled()
    expect(setJsonData).not.toHaveBeenCalled()
  })

  it('should set error message if API response is an error', async () => {
    const setError = jest.fn()
    const setLoading = jest.fn()
    const setJsonData = jest.fn()
    const API = { post: jest.fn(() => ({ data: { res: 'erro' } })) }

    const fileContents = 'some file contents'
    const expectedErrorMessage = 'Erro no processamento do CSV.'

    await handleSubmit()

    expect(setError).toHaveBeenCalledWith(expectedErrorMessage)
    expect(setLoading).toHaveBeenCalledWith(false)
    expect(API.post).toHaveBeenCalledWith('/csv', { fileContents })
    expect(setJsonData).not.toHaveBeenCalled()
  })

  it('should set JSON data if API response is successful', async () => {
    const setError = jest.fn()
    const setLoading = jest.fn()
    const setJsonData = jest.fn()
    const API = { post: jest.fn(() => ({ data: { res: 'success' } })) }

    const fileContents = 'some file contents'

    await handleSubmit()

    expect(setError).toHaveBeenCalledWith(null)
    expect(setLoading).toHaveBeenCalledWith(false)
    expect(API.post).toHaveBeenCalledWith('/csv', { fileContents })
    expect(setJsonData).toHaveBeenCalledWith({ res: 'success' })
  })

  it('should set error message if API call fails', async () => {
    const setError = jest.fn()
    const setLoading = jest.fn()
    const setJsonData = jest.fn()
    const API = { post: jest.fn(() => { throw new Error('API call failed') }) }

    const fileContents = 'some file contents'
    const expectedErrorMessage = 'Erro na requisição para processar o CSV: Error: API call failed'

    await handleSubmit()

    expect(setError).toHaveBeenCalledWith(expectedErrorMessage)
    expect(setLoading).toHaveBeenCalledWith(false)
    expect(API.post).toHaveBeenCalledWith('/csv', { fileContents })
    expect(setJsonData).not.toHaveBeenCalled()
  })
})