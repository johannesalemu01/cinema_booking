import axios from 'axios'
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  try {
    const response = await axios.get(`${config.public.apiUrl}/movie/popular`, {
      params: {
        api_key: config.apiKey
      }
    })
    return response.data
  } catch(error) {
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.response?.data?.message || 'An error occurred while fetching movies.'
    })
  }
})
