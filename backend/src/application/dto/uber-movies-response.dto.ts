export interface UberMoviesResponseDTO {
  title: string
  release_year: string
  locations: string
  production_company: string
  director: string
  writer: string
  actor_1: string
  actor_2: string
  actor_3: string
  point: Point
  longitude: string
  latitude: string
  analysis_neighborhood: string
  supervisor_district: string
  data_as_of: string
  data_loaded_at: string
}

export interface Point {
  type: string
  coordinates: number[]
}
