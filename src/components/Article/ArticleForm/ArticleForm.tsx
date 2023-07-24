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
const ArticleForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<IArticle>({
    mode: 'onTouched',
  })

  const onSubmit: SubmitHandler<IArticle> = (data) => console.log(data)

  const onError: SubmitErrorHandler<IArticle> = (
    errors: FieldErrors<IArticle>,
  ) => console.log(errors)

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate={true}>
        <label htmlFor={'title'}>Название статьи</label>
        <input
          id={'title'}
          defaultValue={''}
          {...register('title', {
            required: { value: true, message: 'Введите название статьи' },
          })}
        />
        <p>{errors.title?.message}</p>

        <label htmlFor={'authors'}>Авторы статьи</label>
        <input
          id={'authors'}
          {...register('authors', {
            required: { value: true, message: 'Введите авторов статьи' },
          })}
        />
        <p>{errors.authors?.message}</p>

        <label htmlFor={'abstract'}>Abstract к статье</label>
        <input id={'abstract'} {...register('abstract')} />

        <label htmlFor={'published_journal'}>Опубликовавший журнал</label>
        <input
          id={'published_journal'}
          {...register('published_journal', {
            required: {
              value: true,
              message: 'Введите название опубликовавшего статью журнала',
            },
          })}
        />
        <p>{errors.published_journal?.message}</p>

        <label htmlFor={'published_year'}>Год публикации</label>
        <input
          id={'published_year'}
          type={'number'}
          {...register('published_year', {
            valueAsNumber: true,
            required: { value: true, message: 'Введите год публикации' },
          })}
        />
        <p>{errors.published_year?.message}</p>

        <label htmlFor={'published_volume'}>Том журнала</label>
        <input
          id={'published_volume'}
          type={'number'}
          {...register('published_volume', { valueAsNumber: true })}
        />

        <label htmlFor={'published_number'}>Номер журнала</label>
        <input
          id={'published_number'}
          type={'number'}
          {...register('published_number', {
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Введите номер журнала, в котором опубликована статья',
            },
          })}
        />
        <p>{errors.published_number?.message}</p>

        <label htmlFor={'pages'}>Страницы статьи в журнале</label>
        <input
          id={'pages'}
          {...register('pages', {
            required: {
              value: true,
              message:
                'Введите страницы, содержащие статью в опубликовавшем журнале',
            },
          })}
        />
        <p>{errors.pages?.message}</p>

        <label htmlFor={'pdf'}>Ссылка на PDF</label>
        <input id={'pdf'} {...register('links.pdf')} />

        <label htmlFor={'wos'}>Ссылка на страницу статьи в WoS</label>
        <input id={'wos'} {...register('links.wos')} />

        <label htmlFor={'is_russian'}>
          Статья опубликована в российском журнале?
        </label>
        <input
          id={'is_russian'}
          {...register('is_russian', { required: true })}
        />
        {errors.is_russian && <span>This field is required</span>}

        <button type={'submit'} disabled={!isDirty || !isValid || isSubmitting}>
          Сохранить статью
        </button>
        <button
          type={'button'}
          disabled={!isDirty}
          onClick={() => {
            reset()
          }}
        >
          Сбросить изменения
        </button>
      </form>
      <DevTool control={control} />
    </>
  )
}

export default ArticleForm
