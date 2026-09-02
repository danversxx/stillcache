import {useMemo, useState} from 'react'

import {
  ArrayOfObjectsInputProps,
  PatchEvent,
  set,
} from 'sanity'

import {
  Card,
  Stack,
  Text,
  TextInput,
  Button,
  Flex,
} from '@sanity/ui'

const BASE_URL = 'https://pub-67d300fe11f74bb2b7b044b304971a5c.r2.dev'

export default function GalleryGeneratorInput(
  props: ArrayOfObjectsInputProps
) {
  const [folder, setFolder] = useState('')
  const [firstImage, setFirstImage] = useState('')
  const [count, setCount] = useState('')
  const [altText, setAltText] = useState('')

  const preview = useMemo(() => {
    if (!folder || !firstImage || !count) return []

    const total = Number(count)

    if (Number.isNaN(total) || total <= 0) return []

    const match = firstImage.match(/^(.*?)(\d+)(\.[^.]+)$/)

    if (!match) return []

    const [, filenamePrefix, firstNumber, extension] = match

    const padding = firstNumber.length
    const start = Number(firstNumber)

    return Array.from({length: total}, (_, index) => {
      const number = String(start + index).padStart(padding, '0')

      return `${BASE_URL}/${folder}/${filenamePrefix}${number}${extension}`
    })
  }, [folder, firstImage, count])

  function generateGallery() {
    const images = preview.map((url, index) => ({
      _type: 'object',
      _key: `${Date.now()}-${index}`,
      url,
      alt: altText,
    }))

    props.onChange(PatchEvent.from(set(images)))
  }

  return (
    <Stack space={4}>
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Text weight="semibold">Gallery Generator</Text>

          <TextInput
            placeholder="Folder (e.g. stills/patlabor-2)"
            value={folder}
            onChange={(e) => setFolder(e.currentTarget.value)}
          />

          <TextInput
            placeholder="First Image (e.g. Patlabor-2-000.png)"
            value={firstImage}
            onChange={(e) => setFirstImage(e.currentTarget.value)}
          />

          <TextInput
            placeholder="Image Count (e.g. 129)"
            value={count}
            onChange={(e) => setCount(e.currentTarget.value)}
          />

          <TextInput
            placeholder="Alt Text (e.g. Patlabor 2)"
            value={altText}
            onChange={(e) => setAltText(e.currentTarget.value)}
          />

          <Flex gap={3}>
            <Button
              text="Preview"
              mode="ghost"
              onClick={() => console.log(preview)}
            />

            <Button
              text="Generate Gallery"
              tone="primary"
              onClick={generateGallery}
              disabled={preview.length === 0}
            />
          </Flex>

          {preview.length > 0 && (
            <Card padding={3} tone="transparent">
              <Stack space={2}>
                <Text size={1}>
                  Will generate {preview.length} images
                </Text>

                <Text size={1}>{preview[0]}</Text>

                {preview.length > 2 && (
                  <>
                    <Text size={1}>…</Text>
                    <Text size={1}>{preview[preview.length - 1]}</Text>
                  </>
                )}
              </Stack>
            </Card>
          )}
        </Stack>
      </Card>

      {props.renderDefault(props)}
    </Stack>
  )
}