import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminApi, bookingsApi, fieldsApi, reviewsApi, usersApi } from '../services/api/resources.js'

export const queryKeys = {
  fields: (params) => ['fields', params],
  field: (id) => ['field', id],
  fieldTypes: ['field-types'],
  reviews: (id) => ['reviews', id],
  myBookings: ['bookings', 'mine'],
  booking: (id) => ['bookings', 'detail', id],
  ownerBookings: ['bookings', 'owner'],
  profile: ['users', 'me'],
  statistics: ['admin', 'statistics'],
  adminUsers: ['admin', 'users'],
  adminOwners: ['admin', 'owners'],
  adminFields: ['admin', 'fields'],
  adminBookings: ['admin', 'bookings'],
}

export function useFields(params = {}) {
  return useQuery({ queryKey: queryKeys.fields(params), queryFn: () => fieldsApi.list(params), placeholderData: (previous) => previous })
}

export function useField(id) {
  return useQuery({ queryKey: queryKeys.field(id), queryFn: () => fieldsApi.detail(id), enabled: Boolean(id) })
}

export function useFieldTypes(enabled = true) {
  return useQuery({ queryKey: queryKeys.fieldTypes, queryFn: fieldsApi.types, enabled })
}

export function useBooking(id) {
  return useQuery({ queryKey: queryKeys.booking(id), queryFn: () => bookingsApi.detail(id), enabled: Boolean(id) })
}

export function useReviews(id) {
  return useQuery({ queryKey: queryKeys.reviews(id), queryFn: () => reviewsApi.field(id), enabled: Boolean(id) })
}

export function useMyBookings(page = 0) {
  return useQuery({ queryKey: [...queryKeys.myBookings, page], queryFn: () => bookingsApi.mine({ page, size: 10 }) })
}

export function useOwnerBookings(page = 0, enabled = true) {
  return useQuery({ queryKey: [...queryKeys.ownerBookings, page], queryFn: () => bookingsApi.owner({ page, size: 10 }), enabled })
}

export function useProfile() {
  return useQuery({ queryKey: queryKeys.profile, queryFn: usersApi.me })
}

export function useCreateBooking() {
  const client = useQueryClient()
  return useMutation({
    mutationFn: bookingsApi.create,
    onSuccess: () => Promise.all([
      client.invalidateQueries({ queryKey: queryKeys.myBookings }),
      client.invalidateQueries({ queryKey: ['fields'] }),
      client.invalidateQueries({ queryKey: ['field'] }),
    ]),
  })
}

export function useBookingAction(action) {
  const client = useQueryClient()
  return useMutation({
    mutationFn: action,
    onSuccess: () => Promise.all([
      client.invalidateQueries({ queryKey: queryKeys.myBookings }),
      client.invalidateQueries({ queryKey: ['bookings', 'detail'] }),
      client.invalidateQueries({ queryKey: queryKeys.ownerBookings }),
      client.invalidateQueries({ queryKey: queryKeys.adminBookings }),
      client.invalidateQueries({ queryKey: ['fields'] }),
      client.invalidateQueries({ queryKey: ['field'] }),
    ]),
  })
}

export function useCreateReview(fieldId) {
  const client = useQueryClient()
  return useMutation({
    mutationFn: reviewsApi.create,
    onSuccess: () => Promise.all([
      client.invalidateQueries({ queryKey: queryKeys.reviews(fieldId) }),
      client.invalidateQueries({ queryKey: queryKeys.myBookings }),
      client.invalidateQueries({ queryKey: queryKeys.field(fieldId) }),
      client.invalidateQueries({ queryKey: ['fields'] }),
    ]),
  })
}

export function useAdminData(key, queryFn, enabled = true) {
  return useQuery({ queryKey: key, queryFn, enabled })
}

export function useAdminMutation(mutationFn, invalidationKeys) {
  const client = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => Promise.all(invalidationKeys.map((queryKey) => client.invalidateQueries({ queryKey }))),
  })
}
