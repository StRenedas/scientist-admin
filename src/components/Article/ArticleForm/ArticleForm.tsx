import { IArticle } from '@/interfaces/article.interface'
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  SubmitErrorHandler,
} from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import Api from '@/shared/api/Api'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Stack,
} from '@mui/material'

const schema = yup.object({
  title: yup.string().required('Введите название статьи'),
  authors: yup.string().required('Введите авторов статьи'),
  abstract: yup.string(),
  published_journal: yup
    .string()
    .required('Введите название опубликовавшего статью журнала'),
  published_year: yup
    .string()
    .required('Введите год публикации')
    .matches(/^(19[0-9][0-9]|20[012][0-9])$/, 'Введите корректный год'),
  published_volume: yup.string().nullable(),
  published_number: yup
    .string()
    .required('Введите номер журнала, в котором опубликована статья'),
  pages: yup
    .string()
    .required('Введите страницы, содержащие статью в опубликовавшем журнале'),
  cite: yup.string(),
  is_russian: yup.boolean().required(),
  is_conference: yup.boolean().required(),
  links: yup.object({
    pdf: yup.string(),
    wos: yup.string(),
    scopus: yup.string(),
    doi: yup.string(),
    rinc: yup.string(),
    vak: yup.string(),
    rsci: yup.string(),
  }),
})

const ArticleForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<IArticle>({
    mode: 'onTouched',
    resolver: yupResolver<IArticle>(schema),
  })

  const onSubmit: SubmitHandler<IArticle> = async (article) => {
    const { data } = await Api.post('/articles', { ...article })
    console.log(data)
  }

  const onError: SubmitErrorHandler<IArticle> = (
    errors: FieldErrors<IArticle>,
  ) => console.log(errors)

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate={true}>
        <Stack spacing={2}>
          <TextField
            label={'Название статьи'}
            {...register('title')}
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth={true}
          />

          <TextField
            label={'Авторы статьи'}
            {...register('authors')}
            error={!!errors.authors}
            helperText={errors.authors?.message}
            fullWidth={true}
          />

          <TextField
            label={'Введение к статье'}
            {...register('abstract')}
            multiline={true}
            fullWidth={true}
          />

          <TextField
            label={'Пример цитирования'}
            {...register('cite')}
            multiline={true}
            fullWidth={true}
          />

          <TextField
            label={'Опубликовавший журнал'}
            {...register('published_journal')}
            error={!!errors.published_journal}
            helperText={errors.published_journal?.message}
            fullWidth={true}
          />

          <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
            <TextField
              label={'Год публикации'}
              type={'number'}
              {...register('published_year')}
              error={!!errors.published_year}
              helperText={errors.published_year?.message}
            />

            <TextField
              label={'Том журнала'}
              type={'number'}
              {...register('published_volume')}
            />

            <TextField
              label={'Номер журнала'}
              type={'number'}
              {...register('published_number')}
              error={!!errors.published_number}
              helperText={errors.published_number?.message}
            />

            <TextField
              label={'Страницы статьи в журнале'}
              {...register('pages')}
              error={!!errors.pages}
              helperText={errors.pages?.message}
            />
          </Stack>

          <TextField
            label={'Ссылка на PDF'}
            {...register('links.pdf')}
            fullWidth={true}
          />

          <TextField
            label={'Ссылка на страницу статьи в WoS'}
            {...register('links.wos')}
            fullWidth={true}
          />

          <FormControlLabel
            control={<Checkbox {...register('is_russian')} />}
            label={'Статья опубликована в российском журнале?'}
          />

          <FormControlLabel
            control={<Checkbox {...register('is_conference')} />}
            label={'Представлена на конференции'}
          />
        </Stack>

        <Button
          type={'button'}
          disabled={!isDirty}
          variant={'contained'}
          color={'error'}
          onClick={() => {
            reset()
          }}
        >
          Сбросить изменения
        </Button>
        <Button
          type={'submit'}
          disabled={!isDirty || !isValid || isSubmitting}
          variant={'contained'}
          color={'success'}
        >
          Сохранить статью
        </Button>
      </form>
      <DevTool control={control} />
    </Box>
  )
}

export default ArticleForm
