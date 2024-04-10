'use client';

import * as React from 'react';
import useMySearchParams from '@/hooks/use-search-params';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useArtists } from '@/queries/get-artists';
import { useCreateArtwork } from '@/mutation/create-artwork';
import toast from 'react-hot-toast';

const defaultFormValues = {

  Title: '',
  Artist: 0,
  URL: '',
  ImageURL: '',
  Nationality: '',
  Date: ''
}

const Header: React.FC = () => {
  const [formValues, setFormValues] = React.useState(defaultFormValues)
  const { setParam } = useMySearchParams()
  const [open, setOpen] = React.useState(false)
  const [searchedArtist, setSearchedArtist] = React.useState('')
  const [value, setValue] = React.useState("")
  const createArtwork = useCreateArtwork()
  const [searchedArtist2, setSearchedArtist2] = React.useState('')
  const { data: artists } = useArtists({ artist: searchedArtist || searchedArtist2 || undefined })

  const submitForm = () => {
    console.log({ formValues })
    createArtwork.mutate(formValues, {
      onSuccess: (data) => {
        toast.success('Artwork added successfully')
        console.log({ data })

      },
      onError: (data) => toast.error('There was an error adding the artwork: ' + data.message)
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setFormValues({ ...formValues, [e.target.name]: e.target.value }) }
  return (
    <div className={cn(['flex items-center justify-between text-b1'])}>
      <Input
        onChange={(e) => {
          setParam('artwork', e.target.value)
        }}
        placeholder="Search Artworks"
        className="min-w-[5rem] mr-1"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-expanded={open}
            className="w-[200px] flex justify-between bg-gray-100 p-2 rounded-2xl"

          >
            {value
              ? artists?.find((artist) => String(artist.ConstituentID) === value)?.DisplayName
              : "Select Artist"}
            <ChevronsUpDown />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search artist..." value={searchedArtist2} onValueChange={(val) => setSearchedArtist2(val)} />
            <CommandEmpty>No artist found.</CommandEmpty>
            <CommandGroup>
              <CommandList>
                {artists?.map((artist) => (
                  <CommandItem
                    key={artist.ConstituentID}
                    value={artist.DisplayName}
                    onSelect={(currentValue) => {
                      const val = String(artists.find(art => art.DisplayName === currentValue)?.ConstituentID)
                      setValue(val ?? '')
                      setParam('artwork-artist', val)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === String(artist.ConstituentID) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {artist.DisplayName}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog>
        <DialogTrigger asChild>
          <button className='bg-blue-400 text-white rounded-2xl hover:bg-blue-500 animate-in duration-300'>Add new artwork</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Title
              </label>
              <Input
                name="Title"
                required
                id="title"
                value={formValues.Title}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <button
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] flex justify-between bg-gray-100 p-2 rounded-2xl"

                  >
                    {value
                      ? artists?.find((artist) => String(artist.ConstituentID) === value)?.DisplayName
                      : "Select Artist"}
                    <ChevronsUpDown />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search artist..." value={searchedArtist} onValueChange={(val) => setSearchedArtist(val)} />
                    <CommandEmpty>No artist found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {artists?.map((artist) => (
                          <CommandItem
                            key={artist.ConstituentID}
                            value={artist.DisplayName}
                            onSelect={(currentValue) => {
                              const val = String(artists.find(art => art.DisplayName === currentValue)?.ConstituentID)
                              setValue(val ?? '')
                              setFormValues({ ...formValues, Artist: Number(val) })
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === String(artist.ConstituentID) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {artist.DisplayName}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="url" className="text-right">
                URL
              </label>
              <Input
                name="URL"
                value={formValues.URL}
                onChange={handleChange}
                id="url"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="imageUrl" className="text-right">
                Thumbnail URL
              </label>
              <Input
                name="ImageURL"
                value={formValues.ImageURL}
                onChange={handleChange}
                id="imageUrl"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="Nationality" className="text-right">
                Nationality
              </label>
              <Input
                name="Nationality"
                value={formValues.Nationality}
                onChange={handleChange}
                id="Nationality"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="Date" className="text-right">
                Date
              </label>
              <Input
                value={formValues.Date}
                onChange={handleChange}
                name="Date"
                id="Date"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <button type="submit" onClick={(e) => {
              e.preventDefault()
              submitForm()
            }}>Submit</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;

