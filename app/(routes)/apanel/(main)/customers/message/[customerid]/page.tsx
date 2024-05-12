"use client";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function APanelCustomerMessageCustomeridPage({ params } : { params: { customerid: string } }) {
  return (
    <div className="flex flex-col space-y-3 p-4">
        <h1 className="text-2xl font-bold">Send message to customer {params.customerid}</h1>
        <Label>Select message template</Label>
        <Select>
            <SelectTrigger>
                <SelectValue>Select message template</SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="custom">Custom message</SelectItem>
                    <SelectItem value="template1">Template 1</SelectItem>
                    <SelectItem value="template2">Template 2</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        <Label>Message</Label>
        <Input type="text" placeholder="Message" />
        <Button className="bg-gray-900 hover:bg-gray-800 w-[200px]">Send message</Button>

        <div className="flex flex-col space-y-3 pt-6">
            <Label>Subject</Label>
            <Input type="text" placeholder="Subject" />
            <Label>Message</Label>
            <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            toolbar: {
                                              items: ["bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "undo", "redo"],
                                            },
                                          }}
                                            onReady={(editor) => {
                                            editor.ui.view.editable.element.style.minHeight = "200px";
                                            }}
                                            onFocus={(event, editor) => {
                                                editor.ui.view.editable.element.style.minHeight = "200px";
                                            }
                                        }
                                        onBlur={(event, editor) => {
                                            editor.ui.view.editable.element.style.minHeight = "200px";
                                        }}
                                          />
            <Button className="bg-gray-900 hover:bg-gray-800 w-[200px]">Send Email</Button>
        </div>
    </div>
  );    
}