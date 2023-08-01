import { IArticle } from '@/interfaces/article.interface'
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  SubmitErrorHandler,
} from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import Api from '@/shared/api/Api'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { close, error, success } from '@/store/alertSlice'

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
  const alert = useAppSelector((state) => state.alert)
  const dispatch = useAppDispatch()

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
    const { statusCode, message } = await Api.post('/articles', { ...article })
    statusCode ? dispatch(error(message)) : dispatch(success(message))
  }

  const onError: SubmitErrorHandler<IArticle> = (
    errors: FieldErrors<IArticle>,
  ) => console.log(errors)

  return (
    <Box>
      <h2>Добавление статьи</h2>
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
            label={'Опубликована в российском журнале'}
          />

          <FormControlLabel
            control={<Checkbox {...register('is_conference')} />}
            label={'Представлена на конференции'}
          />
        </Stack>

        <Stack mt={2} direction={'row'} spacing={2}>
          <Button
            type={'submit'}
            disabled={!isDirty || !isValid || isSubmitting}
            variant={'contained'}
            color={'success'}
          >
            Сохранить
          </Button>
          <Button
            type={'button'}
            disabled={!isDirty}
            variant={'contained'}
            color={'error'}
            onClick={() => {
              reset()
            }}
          >
            Сбросить
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
      <Snackbar
        open={alert.show}
        autoHideDuration={5000}
        onClose={() => dispatch(close())}
      >
        <Alert onClose={() => dispatch(close())} severity={alert.color}>
          {alert.text}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default ArticleForm
