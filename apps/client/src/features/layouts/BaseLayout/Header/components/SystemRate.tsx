import { BadStar, GoodStar, NormalStar, TerribleStar, WonderfulStar } from '@/assets/SVG'
import ThankReaper from '@/assets/SVG/ThankReaper'
import { selectOneselfInfoQuery, systemRateMutation } from '@/features/user'
import { APP_NAME } from '@/shared/constants/app'
import { Dispatch, SetStateAction } from 'react'

interface SystemRateProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const rateSvg = (value: number) => {
  switch (value) {
    case 1:
      return <TerribleStar />
    case 2:
      return <BadStar />
    case 3:
      return <NormalStar />
    case 4:
      return <GoodStar />
    case 5:
      return <WonderfulStar />
  }
}

export function SystemRate({ open, setOpen }: SystemRateProps) {
  const [value, setValue] = useState(3)
  const { t } = useTranslation(['COMMON', 'PROMPT'])
  const { data: oneselfInfoData } = selectOneselfInfoQuery()
  const desc = [
    t('COMMON:rate.terrible'),
    t('COMMON:rate.bad'),
    t('COMMON:rate.normal'),
    t('COMMON:rate.good'),
    t('COMMON:rate.wonderful')
  ]

  const { mutate: systemRateMutate } = systemRateMutation()

  function handleOk() {
    if (oneselfInfoData?.data.systemScore === null) {
      systemRateMutate(value)
    }
    setOpen(false)
  }
  function handleCancel() {
    setOpen(false)
  }
  return (
    <Modal
      title={t('COMMON:system_rating')}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      className="text-center"
    >
      {oneselfInfoData?.data.systemScore === null ? (
        <>
          <div>{t('PROMPT:are_you_satisfied_with_app', { APP_NAME: APP_NAME })}</div>
          <div>
            <div className="flex justify-center">{rateSvg(value)}</div>
            <Flex
              gap="middle"
              vertical
            >
              <Rate
                tooltips={desc}
                onChange={setValue}
                value={value}
              />
              {value ? <span>{desc[value - 1]}</span> : null}
            </Flex>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center">
            <ThankReaper />
          </div>
          <div>{t('PROMPT:thank_you_for_rating')}</div>
        </>
      )}
    </Modal>
  )
}
